import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JourneyData } from "@/lib/types";
import { rateLimit } from "@/lib/rateLimit";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { okJson, errorJson } from "@/lib/http";

// Helper function to determine the number of experiences based on duration
const getExperienceCount = (duration: string): number => {
  switch (duration) {
    case "1-3":
      return 3;
    case "4-7":
      return 5;
    case "8-14":
      return 7;
    case "15+":
      return 10;
    default:
      return 3;
  }
};

export async function POST(req: NextRequest) {
  const rl = rateLimit("itineraries:post", 30, 60_000);
  if (!rl.allowed) return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  const body = (await req.json()) as JourneyData & { seed?: number };
  const { interests, duration, emotions, prompt } = body;
  const seed = typeof body.seed === 'number' ? body.seed : Date.now();

  if (!interests || !duration) return errorJson("Missing required fields: interests, duration", 400);

  const experienceCount = getExperienceCount(duration);
  const categories = [...interests, ...emotions]; // Combine interests and emotions for a broader search

  try {
    // Fetch experiences that match the user's interests and emotions
    let experiences = await prisma.experience.findMany({
      where: {
        isActive: true,
        category: {
          in: categories,
        },
      },
      include: {
        guide: true,
      },
      take: experienceCount,
    });

    // If not enough experiences are found, supplement with popular ones
    if (experiences.length < experienceCount) {
      const fallbackExperiences = await prisma.experience.findMany({
        where: {
          isActive: true,
          id: {
            notIn: experiences.map((e) => e.id), // Exclude already selected experiences
          },
        },
        orderBy: {
          reviews: {
            _count: "desc", // Order by popularity (number of reviews)
          },
        },
        include: {
          guide: true,
        },
        take: experienceCount - experiences.length,
      });
      experiences = [...experiences, ...fallbackExperiences];
    }

    // If OpenAI is configured, generate an AI-authored itinerary narrative
    if (process.env.OPENAI_API_KEY) {
      const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const ItinerarySchema = z.object({
        title: z.string(),
        days: z.array(z.object({
          day: z.number(),
          title: z.string(),
          description: z.string(),
          experienceId: z.string(),
          guideName: z.string(),
          emoji: z.string().default("✨"),
          info: z.string().optional(),
          tips: z.string().optional(),
        }))
      });

      const system = `You are an expert Israeli tourism journey designer.
Create an emotionally compelling, safe, culturally sensitive, story-driven itinerary.
Return concise JSON that matches the provided schema. Use the provided candidate experiences and preserve their ids.`;
      const user = {
        prompt: prompt ?? "",
        preferences: { interests, emotions, duration },
        seed,
        candidates: experiences.map(e => ({ id: e.id, title: e.title, description: e.description, guide: e.guide?.name || "" }))
      };

      const { object } = await generateObject({
        model: openai("gpt-4o-mini"),
        system,
        prompt: `User input: ${JSON.stringify(user)}`,
        schema: ItinerarySchema,
        mode: "json",
      });

      const byId = new Map(experiences.map(e => [e.id, e]));
      const days = object.days.map((d: any, i: number) => {
        const exp = byId.get(d.experienceId) || experiences[i % experiences.length];
        return {
          day: i + 1,
          title: d.title || exp.title,
          description: d.description || exp.description,
          experienceId: exp.id,
          guideName: d.guideName || exp.guide?.name || "",
          emoji: d.emoji || "✨",
          info: d.info,
          tips: d.tips,
        };
      });

      return okJson({ title: object.title, days });
    }

    // Fallback: non-AI itinerary
    const itineraryDays = experiences.map((exp, index) => ({
      day: index + 1,
      title: exp.title,
      description: exp.description,
      experienceId: exp.id,
      guideName: exp.guide.name,
      emoji: "✨",
    }));
    return okJson({ title: "Your Personalized Journey to Israel", days: itineraryDays });
  } catch (error) {
    console.error("Itinerary generation error:", error);
    return errorJson("Failed to generate itinerary", 500);
  }
}

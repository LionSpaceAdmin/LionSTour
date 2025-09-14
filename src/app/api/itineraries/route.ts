import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JourneyData } from "@/lib/types";

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
  const { interests, duration, emotions } = (await req.json()) as JourneyData;

  if (!interests || !duration) {
    return NextResponse.json(
      { error: "Missing required fields: interests, duration" },
      { status: 400 }
    );
  }

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

    // Structure the itinerary by days
    const itineraryDays = experiences.map((exp, index) => ({
      day: index + 1,
      title: exp.title,
      description: exp.description,
      experienceId: exp.id,
      guideName: exp.guide.name,
      emoji: "✨", // Placeholder emoji
    }));

    const itinerary = {
      title: "Your Personalized Journey to Israel",
      days: itineraryDays,
    };

    return NextResponse.json(itinerary);
  } catch (error) {
    console.error("Itinerary generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}
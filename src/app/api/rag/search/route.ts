import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { embed } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGateway } from "@ai-sdk/gateway";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
const gateway = process.env.AI_GATEWAY_API_KEY
  ? createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY })
  : null;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  if (!query) return NextResponse.json({ results: [] });

  const model = openai.embedding('openai:text-embedding-3-small');
  const q = await embed({ model, value: query });
  const qVec = q.embedding;
  const qNorm = Math.sqrt(qVec.reduce((s: number, v: number) => s + v * v, 0)) || 1;

  const docs = await prisma.knowledge.findMany({});
  const ranked = docs
    .map((d) => {
      const v = (d.embedding as unknown as number[]) ?? [];
      const dot = v.reduce((s, val, i) => s + val * (qVec[i] ?? 0), 0);
      const vNorm = Math.sqrt(v.reduce((s, val) => s + val * val, 0)) || 1;
      const sim = dot / (qNorm * vNorm || 1);
      return { slug: d.slug, title: d.title, content: d.content, similarity: sim };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);

  return NextResponse.json({ results: ranked });
}

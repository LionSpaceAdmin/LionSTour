import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { embedMany } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGateway } from "@ai-sdk/gateway";
import { readFile } from "fs/promises";
import path from "path";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
const gateway = process.env.AI_GATEWAY_API_KEY
  ? createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY })
  : null;

export async function POST() {
  const filepath = path.join(process.cwd(), "TOURISM_PLATFORM_SPEC.md");
  let content = "";
  try {
    content = await readFile(filepath, "utf8");
  } catch {
    return NextResponse.json({ error: "Spec file not found" }, { status: 404 });
  }

  // naive chunking by paragraphs
  const paras = content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const chunks: { title: string; slug: string; content: string }[] = paras.map((p, i) => ({
    title: `Spec Paragraph ${i + 1}`,
    slug: `tourism-spec-${String(i + 1).padStart(3, "0")}`,
    content: p.slice(0, 2000),
  }));

  const model = openai.embedding('openai:text-embedding-3-small');
  const embedResult = await embedMany({ model, values: chunks.map((c) => c.content) });

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const emb = embedResult.embeddings[i] ?? [];
    await prisma.knowledge.upsert({
      where: { slug: c.slug },
      update: { title: c.title, content: c.content, embedding: emb as any },
      create: { slug: c.slug, title: c.title, content: c.content, embedding: emb as any },
    });
  }

  return NextResponse.json({ ok: true, count: chunks.length });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { embedMany } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Doc = { slug: string; title: string; content: string };

export async function POST() {
  // Gather data from Prisma (experiences + guides)
  const [experiences, guides] = await Promise.all([
    prisma.experience.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        location: true,
      },
      take: 1000,
    }).catch(() => []),
    prisma.guide.findMany({
      select: { id: true, name: true, bio: true, languages: true, specialties: true },
      take: 1000,
    }).catch(() => []),
  ]);

  const docs: Doc[] = [];
  for (const e of (experiences as Array<{ id: string; title: string; description: string | null; category: string | null; location: string | null }>)) {
    docs.push({
      slug: `exp-${e.id}`,
      title: e.title,
      content: `${e.description || ""}\nקטגוריה: ${e.category || ""}\nמיקום: ${e.location || ""}`.slice(0, 5000),
    });
  }
  for (const g of (guides as Array<{ id: string; name: string; bio: string | null; languages: string[] | null; specialties: string[] | null }>)) {
    docs.push({
      slug: `guide-${g.id}`,
      title: g.name,
      content: `${g.bio || ""}\nשפות: ${(g.languages || []).join(", ")}\nהתמחויות: ${(g.specialties || []).join(", ")}`.slice(0, 5000),
    });
  }

  if (docs.length === 0) return NextResponse.json({ ok: true, count: 0 });

  const model = openai.embedding('openai:text-embedding-3-small');
  const result = await embedMany({ model, values: docs.map((d) => d.content) });

  for (let i = 0; i < docs.length; i++) {
    const d = docs[i];
    const emb = result.embeddings[i] ?? [];
    await prisma.knowledge.upsert({
      where: { slug: d.slug },
      update: { title: d.title, content: d.content, embedding: emb as any },
      create: { slug: d.slug, title: d.title, content: d.content, embedding: emb as any },
    });
  }

  return NextResponse.json({ ok: true, count: docs.length });
}

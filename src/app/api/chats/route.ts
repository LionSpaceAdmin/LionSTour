import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const chats = await prisma.chat.findMany({
    orderBy: { updatedAt: "desc" },
    take: 50,
    select: { id: true, title: true, createdAt: true, updatedAt: true },
  });
  return NextResponse.json({ chats });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const title = typeof body?.title === "string" ? body.title : null;
  const chat = await prisma.chat.create({ data: { title: title || null } });
  return NextResponse.json({ chat });
}


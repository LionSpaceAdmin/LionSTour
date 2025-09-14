import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const chat = await prisma.chat.findUnique({ where: { id } });
  if (!chat) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const messages = await prisma.chatMessage.findMany({
    where: { chatId: id },
    orderBy: { createdAt: "asc" },
    select: { uiId: true, role: true, parts: true },
  });

  // Shape as UIMessage[]
  const uiMessages = messages.map((m: any) => ({ id: m.uiId, role: m.role, parts: m.parts as any }));
  return NextResponse.json({ chat: { id: chat.id, title: chat.title }, messages: uiMessages });
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function ChatList() {
  const chats = await prisma.chat.findMany({
    orderBy: { updatedAt: "desc" },
    take: 50,
    select: { id: true, title: true, updatedAt: true },
  });
  return (
    <ul className="space-y-2">
      {chats.map((c) => (
        <li key={c.id}>
          <Link
            href={`/chat/${c.id}`}
            className="block rounded-md border p-3 hover:bg-neutral-50"
          >
            <div className="text-sm font-medium">{c.title || "שיחה חדשה"}</div>
            <div className="text-xs text-neutral-500">
              עודכן: {new Date(c.updatedAt).toLocaleString("he-IL")}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ChatIndexPage() {
  async function createChat() {
    "use server";
    const chat = await prisma.chat.create({ data: { title: null } });
    redirect(`/chat/${chat.id}`);
  }
  return (
    <main className="container mx-auto max-w-4xl px-4 py-6 rtl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">צ׳אט חכם</h1>
        <form action={createChat}>
          <button
            type="submit"
            className="rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
          >
            שיחה חדשה
          </button>
        </form>
      </div>
      <Suspense fallback={<div>טוען...</div>}>
        <ChatList />
      </Suspense>
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ChatRoom from "./room";

export const dynamic = "force-dynamic";

export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chat = await prisma.chat.findUnique({ where: { id } });
  if (!chat) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-6 rtl">
        <p>השיחה לא נמצאה.</p>
        <Link href="/chat" className="text-amber-600 hover:underline">
          חזרה לצ׳אט
        </Link>
      </main>
    );
  }

  const chats = await prisma.chat.findMany({
    orderBy: { updatedAt: "desc" },
    take: 30,
    select: { id: true, title: true },
  });

  return (
    <main className="container mx-auto max-w-6xl px-4 py-6 rtl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">השיחות שלי</h2>
            <Link
              href="/chat"
              className="text-sm text-amber-600 hover:underline"
            >
              כולן
            </Link>
          </div>
          <ul className="space-y-2">
            {chats.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/chat/${c.id}`}
                  className={`block rounded-md border p-3 hover:bg-neutral-50 ${
                    c.id === chat.id ? "border-amber-400" : ""
                  }`}
                >
                  <div className="text-sm font-medium">
                    {c.title || "שיחה חדשה"}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <section className="md:col-span-8 lg:col-span-9">
          <ChatRoom chatId={chat.id} title={chat.title || "שיחה חדשה"} />
        </section>
      </div>
    </main>
  );
}

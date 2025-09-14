import { streamText, convertToModelMessages, type UIMessage, tool, embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGateway } from '@ai-sdk/gateway';
import { prisma } from '@/lib/prisma';
import { z } from 'zod/v4';

export const runtime = 'nodejs';

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
const gateway = process.env.AI_GATEWAY_API_KEY
  ? createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY })
  : null;

export async function POST(req: Request) {
  const body = await req.json();
  const chatId: string | undefined = body?.id;
  const uiMessages: UIMessage[] = body?.messages ?? [];

  // Ensure chat exists
  if (chatId) {
    await prisma.chat.upsert({
      where: { id: chatId },
      update: {},
      create: { id: chatId },
    });

    // Persist any new incoming user messages by their UI id
    for (const m of uiMessages) {
      try {
        await prisma.chatMessage.create({
          data: {
            chatId,
            uiId: m.id,
            role: m.role,
            parts: m.parts as unknown as any,
          },
        });
      } catch (_) {
        // ignore duplicates (unique on uiId)
      }
    }
  }

  const modelMessages = convertToModelMessages(
    uiMessages.map(({ id: _omit, ...rest }) => rest)
  );

  // Resolve requested model
  const rawModelId: string | undefined = typeof body?.modelId === 'string' ? body.modelId : undefined;
  const useGateway = !!process.env.AI_GATEWAY_API_KEY;
  const defaultModel = useGateway ? 'openai:gpt-4o-mini' : 'gpt-4o-mini';
  const chosen = rawModelId ?? defaultModel;
  const resolvedModelId = useGateway
    ? (chosen.includes(':') ? chosen : `openai:${chosen}`)
    : chosen.replace(/^openai:/, '');

  const defineTool: any = tool as any;

  const result = await streamText({
    model: (gateway ?? openai)(resolvedModelId as any),
    messages: modelMessages,
    system:
      'You are LionSTour\'s helpful travel assistant. Be concise, friendly, and answer in the user\'s language (he/en). Provide actionable suggestions for experiences, guides, and safety.',
    tools: ({
      search_experiences: defineTool({
        description: 'Search available experiences by query, category, location, and max price.',
        parameters: z.object({
          query: z.string().optional(),
          category: z.string().optional(),
          location: z.string().optional(),
          maxPrice: z.number().optional(),
        }),
        execute: async ({ query, category, location, maxPrice }: { query?: string; category?: string; location?: string; maxPrice?: number }) => {
          const where: any = { isActive: true };
          if (category) where.category = { contains: category, mode: 'insensitive' };
          if (location) where.location = { contains: location, mode: 'insensitive' };
          if (typeof maxPrice === 'number') where.price = { lte: maxPrice };
          if (query) {
            where.OR = [
              { title: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ];
          }

          const experiences = await prisma.experience.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 10,
            select: { id: true, title: true, category: true, location: true, price: true, duration: true },
          });
          return { count: experiences.length, experiences };
        },
      }),

      book_experience: defineTool({
        description: 'Create a booking for an experience when the user provides email, experienceId, date, and guests.',
        parameters: z.object({
          experienceId: z.string(),
          dateISO: z.string(),
          guests: z.number().min(1),
          email: z.string().email(),
          name: z.string().optional(),
          notes: z.string().optional(),
        }),
        execute: async ({ experienceId, dateISO, guests, email, name, notes }: { experienceId: string; dateISO: string; guests: number; email: string; name?: string; notes?: string }) => {
          const exp = await prisma.experience.findUnique({ where: { id: experienceId } });
          if (!exp) return { ok: false, error: 'Experience not found' };
          const price = Math.max(0, Math.round(exp.price * guests));
          const user = await prisma.user.upsert({
            where: { email },
            update: { name: name ?? undefined },
            create: { email, name: name ?? null },
          });
          const booking = await prisma.booking.create({
            data: {
              date: new Date(dateISO),
              guests,
              totalPrice: price,
              userId: user.id,
              experienceId: exp.id,
              guideId: exp.guideId,
              notes: notes ?? null,
            },
            select: { id: true, status: true, totalPrice: true },
          });
          return { ok: true, booking };
        },
      }),

      rag_search: defineTool({
        description: 'Search internal knowledge base for relevant information about LionSTour and tourism platform details.',
        parameters: z.object({ query: z.string() }),
        execute: async ({ query }: { query: string }) => {
          // Embed the query
          const model = openai.embedding('openai:text-embedding-3-small');
          const q = await embed({ model, value: query });
          const qVec = q.embedding;
          // Load knowledge
          const docs = await prisma.knowledge.findMany({ take: 200, orderBy: { updatedAt: 'desc' } });
          // Rank by cosine similarity
          const qNorm = Math.sqrt(qVec.reduce((s: number, v: number) => s + v * v, 0));
          const ranked = docs
            .map((d) => {
              const v = (d.embedding as unknown as number[]) ?? [];
              const dot = v.reduce((s, val, i) => s + val * (qVec[i] ?? 0), 0);
              const vNorm = Math.sqrt(v.reduce((s, val) => s + val * val, 0)) || 1;
              const sim = dot / (qNorm * vNorm || 1);
              return { slug: d.slug, title: d.title, content: d.content, similarity: sim };
            })
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 3);
          return { results: ranked };
        },
      }),
    }) as any,
    toolChoice: 'auto',
  });

  // Persist assistant message on finish (if we have a chat id)
  if (chatId) {
    // Fire-and-forget; do not block streaming
    (async () => {
      try {
        const text = await result.text;
        await prisma.chat.update({ where: { id: chatId }, data: { updatedAt: new Date() } });
        await prisma.chatMessage.create({
          data: {
            chatId,
            uiId: `asst_${Date.now()}`,
            role: 'assistant',
            parts: [{ type: 'text', text }] as any,
          },
        });
      } catch {}
    })();
  }

  return result.toUIMessageStreamResponse();
}

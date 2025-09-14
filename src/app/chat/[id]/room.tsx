"use client";

import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { DefaultChatTransport } from "ai";

export default function ChatRoom({ chatId, title }: { chatId: string; title: string }) {
  const [modelId, setModelId] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("ai:modelId") || "gpt-4o-mini" : "gpt-4o-mini"
  );
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat", body: { modelId } }), [modelId]);
  const { messages, sendMessage, status, setMessages } = useChat({ id: chatId, transport });

  useEffect(() => {
    // Load existing messages from server
    (async () => {
      const res = await fetch(`/api/chats/${chatId}`);
      if (!res.ok) return;
      const data = await res.json();
      const initial: UIMessage[] = data.messages ?? [];
      if (initial.length) setMessages(initial);
    })();
  }, [chatId, setMessages]);

  return (
    <div className="flex h-[70vh] flex-col rounded-xl border">
      <div className="flex items-center justify-between border-b p-3">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="model" className="text-neutral-700">מודל:</label>
          <select
            id="model"
            value={modelId}
            onChange={(e) => {
              const v = e.target.value;
              setModelId(v);
              if (typeof window !== "undefined") localStorage.setItem("ai:modelId", v);
            }}
            className="rounded-md border border-neutral-300 bg-white px-2 py-1"
          >
            <option value="gpt-4o-mini">OpenAI · gpt-4o-mini</option>
            <option value="gpt-4o">OpenAI · gpt-4o</option>
            <option value="openai:gpt-4o-mini">Gateway · openai:gpt-4o-mini</option>
            <option value="openai:gpt-4o">Gateway · openai:gpt-4o</option>
          </select>
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.length === 0 && (
          <p className="text-sm text-neutral-500">התחילו שיחה…</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
            <div
              className={
                "inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed " +
                (m.role === "user"
                  ? "bg-amber-500 text-white"
                  : "bg-neutral-100 text-neutral-900")
              }
            >
              <div>
                {m.parts.map((p: unknown, idx) => {
                  const part = p as { type: string; [k: string]: any };
                  if (part.type === "text") return <TextPart key={idx} text={part.text as string} />;
                  if (part.type === "file" && typeof part.mediaType === 'string' && part.mediaType.startsWith("image")) {
                    return (
                      <img
                        key={idx}
                        src={String(part.url)}
                        alt={(part.filename as string) || "image"}
                        className="my-2 max-h-64 rounded-md"
                      />
                    );
                  }
                  // Tool invocations (tool-*) and dynamic-tool
                  if (typeof part.type === "string" && (part.type.startsWith("tool-") || part.type === "dynamic-tool")) {
                    const toolName = part.type === "dynamic-tool" ? (part.toolName as string) : part.type.replace(/^tool-/, "");
                    return (
                      <div key={idx} className="my-2 rounded border border-neutral-300 bg-white p-2 text-left">
                        <div className="mb-1 text-xs font-semibold text-neutral-700">כלי: {toolName}</div>
                        {part.state === "input-available" && (
                          <pre className="overflow-auto rounded bg-neutral-50 p-2 text-xs text-neutral-700">{JSON.stringify(part.input, null, 2)}</pre>
                        )}
                        {part.state === "output-available" && (
                          <div className="space-y-2">
                            {/* Try to render known tool outputs nicely */}
                            {toolName === "search_experiences" && (part.output as any)?.experiences ? (
                              <ul className="list-inside list-disc text-xs">
                                {(part.output as any).experiences.map((e: any) => (
                                  <li key={e.id}>
                                    <span className="font-medium">{e.title}</span> · {e.location} · {e.category} · {e.duration} ד׳ · ₪{Math.round(e.price)}
                                  </li>
                                ))}
                              </ul>
                            ) : toolName === "book_experience" && (part.output as any)?.ok ? (
                              <div className="text-xs">
                                ההזמנה בוצעה! מזהה: <span className="font-mono">{(part.output as any)?.booking?.id}</span>
                              </div>
                            ) : toolName === "rag_search" && (part.output as any)?.results ? (
                              <ul className="list-inside list-disc text-xs">
                                {(part.output as any).results.map((r: any) => (
                                  <li key={r.slug}>
                                    <span className="font-medium">{r.title}</span> — <span className="text-neutral-600">{(r.content || "").slice(0, 120)}…</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <pre className="overflow-auto rounded bg-neutral-50 p-2 text-xs text-neutral-700">{JSON.stringify((part as any).output ?? part, null, 2)}</pre>
                            )}
                          </div>
                        )}
                        {part.state === "output-error" && (
                          <div className="text-xs text-red-600">שגיאה בהפעלת כלי: {String((part as any).errorText || '')}</div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}
        {(status === "submitted" || status === "streaming") && (
          <div className="text-left">
            <div className="inline-block animate-pulse rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-500">
              כותב…
            </div>
          </div>
        )}
      </div>
      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 border-t bg-neutral-50 px-2 py-2">
        {[
          "מצא חוויות בירושלים עד ₪400",
          "הצע מסלול יומי בתל אביב",
          "הסבר בטיחות למטיילים באזור הגליל",
          "הזמן חוויה לדצמבר לשני אורחים",
        ].map((s) => (
          <button
            key={s}
            onClick={() => sendMessage({ text: s })}
            className="rounded-full border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-100"
            type="button"
          >
            {s}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const input = form.elements.namedItem("prompt") as HTMLInputElement;
          const fileInput = form.elements.namedItem("attachments") as HTMLInputElement | null;
          const value = input.value.trim();
          if (!value) return;
          const files = fileInput?.files && fileInput.files.length > 0 ? fileInput.files : undefined;
          if (files) {
            sendMessage({ text: value, files });
            fileInput!.value = "";
          } else {
            sendMessage({ text: value });
          }
          input.value = "";
        }}
        className="flex gap-2 border-t p-2"
      >
        <input
          name="prompt"
          placeholder="כתבו הודעה..."
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
        />
        <input
          type="file"
          name="attachments"
          className="hidden"
          id="chat-attachments"
          accept="image/*,application/pdf"
          multiple
        />
        <label
          htmlFor="chat-attachments"
          className="cursor-pointer rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
        >
          קובץ
        </label>
        <button
          type="submit"
          disabled={status === "submitted" || status === "streaming"}
          className="rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
        >
          שלח
        </button>
      </form>
    </div>
  );
}

function TextPart({ text }: { text: string }) {
  // Very light renderer: code blocks and urls
  const segments = useMemo(() => parseText(text), [text]);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === 'code')
          return (
            <pre key={i} className="my-2 overflow-auto rounded-md bg-neutral-900 p-2 text-[12px] leading-relaxed text-neutral-100">
              <code>{seg.content}</code>
            </pre>
          );
        if (seg.type === 'link')
          return (
            <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className="underline">
              {seg.text}
            </a>
          );
        return <span key={i}>{seg.text}</span>;
      })}
    </>
  );
}

type Segment =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'code'; content: string };

function parseText(text: string): Segment[] {
  // Handle code blocks fenced by ```
  const parts = text.split(/```[a-zA-Z0-9_-]*\n?|```/g); // naive split
  const segs: Segment[] = [];
  for (let i = 0; i < parts.length; i++) {
    const isCode = i % 2 === 1; // odd indices are code
    const t = parts[i];
    if (!t) continue;
    if (isCode) {
      segs.push({ type: 'code', content: t.replace(/\n+$/, '') });
    } else {
      // linkify http/https urls
      const tokens = t.split(/(https?:\/\/[^\s)]+\b)/g);
      for (const token of tokens) {
        if (!token) continue;
        if (/^https?:\/\//.test(token)) segs.push({ type: 'link', text: token, href: token });
        else segs.push({ type: 'text', text: token });
      }
    }
  }
  return segs;
}

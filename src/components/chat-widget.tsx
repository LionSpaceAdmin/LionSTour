"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { Send, MessageCircle } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status } = useChat();
  const [text, setText] = useState("");

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (open && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className="fixed z-50" style={{ insetInlineStart: 16, bottom: 16 }}>
      {/* Toggle Button */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={containerRef}
          className="mt-3 w-[min(92vw,380px)] rounded-xl border border-neutral-200 bg-white shadow-2xl rtl text-neutral-900"
        >
          <div className="flex items-center justify-between border-b px-4 py-2">
            <span className="text-sm font-semibold">עוזר מסע של LionSTour</span>
            <button
              className="rounded p-1 text-neutral-500 hover:bg-neutral-100"
              onClick={() => setOpen(false)}
              aria-label="סגור"
            >
              ✕
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto px-3 py-2 space-y-2">
            {messages.length === 0 && (
              <p className="text-sm text-neutral-500">
                שאלו אותי על חוויות, מדריכים ובטיחות בישראל.
              </p>
            )}
            {messages.map((m: UIMessage) => (
              <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={
                    "inline-block rounded-lg px-3 py-2 text-sm " +
                    (m.role === "user"
                      ? "bg-amber-500 text-white"
                      : "bg-neutral-100 text-neutral-900")
                  }
                >
                  {m.parts
                    .map((part) => (part.type === "text" ? part.text : ""))
                    .join("")}
                </div>
              </div>
            ))}
            {(status === "submitted" || status === "streaming") && (
              <div className="text-left">
                <div className="inline-block animate-pulse rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-500">
                  כותב...
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const value = text.trim();
              if (value.length === 0) return;
              sendMessage({ text: value });
              setText("");
            }}
            className="flex gap-2 border-t p-2"
          >
            <input
              name="prompt"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="כתבו הודעה..."
              className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              type="submit"
              disabled={text.trim().length === 0 || status === "submitted" || status === "streaming"}
              className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              שלח
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

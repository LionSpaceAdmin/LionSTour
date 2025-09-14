"use client";

import dynamic from "next/dynamic";

// Lazy-load chat widget on the client only
const ChatWidgetLazy = dynamic(() => import("@/components/chat-widget"), {
  ssr: false,
});

export function ClientChatWidget() {
  return <ChatWidgetLazy />;
}

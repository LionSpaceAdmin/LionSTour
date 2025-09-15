"use client";

import { lazy, Suspense, useEffect, useState } from "react";

// Lazy-load without next/dynamic to avoid SSR bailout markers in dev
const ChatWidget = lazy(() => import("@/components/chat-widget"));

export function ClientChatWidget() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
}

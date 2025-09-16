"use client";

import { usePathname } from "next/navigation";
import { ClientChatWidget } from "@/components/ClientChatWidget";

export function ClientChatWidgetGate() {
  const pathname = usePathname() || "/";
  // Avoid rendering chat on enterprise pages only
  if (pathname.startsWith("/enterprise")) return null;
  return <ClientChatWidget />;
}

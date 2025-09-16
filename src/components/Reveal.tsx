"use client";

import { PropsWithChildren } from "react";
import { useReveal } from "@/hooks/useReveal";

export function Reveal({ children, delay = 0, className = "" }: PropsWithChildren<{ delay?: number; className?: string }>) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={
        `${className} transition-all duration-700 will-change-transform ` +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
      }
    >
      {children}
    </div>
  );
}


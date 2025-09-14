"use client";

import { PropsWithChildren, useEffect, useRef } from "react";

export default function ScrollScene({ children, speed = 0.15, className = "" }: PropsWithChildren<{ speed?: number; className?: string }>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const translate = (1 - progress) * 40 * speed; // subtle parallax
      const opacity = Math.min(1, progress + 0.2);
      el.style.transform = `translateY(${translate.toFixed(2)}px)`;
      el.style.opacity = String(opacity);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform opacity-0 transition-opacity duration-500 ${className}`}>{children}</div>
  );
}


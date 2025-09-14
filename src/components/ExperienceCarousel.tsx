"use client";

import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { useRef } from "react";

type CarouselItem = {
  id: string;
  title: string;
  subtitle?: string;
  duration?: number;
  image: string;
  href: string;
};

export default function ExperienceCarousel({ items }: { items?: CarouselItem[] }) {
  const data: CarouselItem[] =
    items && items.length
      ? items
      : [
          {
            id: "jrslm",
            title: "Jerusalem: Ancient & Sacred",
            subtitle: "3–4 hours • with Sarah",
            image: "/globe.svg",
            href: "/experiences",
          },
          {
            id: "tlv",
            title: "Tel Aviv: Modern & Vibrant",
            subtitle: "2–3 hours • with Rachel",
            image: "/window.svg",
            href: "/experiences",
          },
          {
            id: "glilee",
            title: "Galilee: Nature & Spirit",
            subtitle: "5–6 hours • with David",
            image: "/file.svg",
            href: "/experiences",
          },
        ];

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(560, el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="relative py-10">
      <div className="px-6">
        <div className="flex items-center justify-between mb-2">
          <span className="sr-only">Use arrow buttons or swipe to browse experiences</span>
          <div className="flex gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Scroll left" className="rounded-full border border-white/20 bg-black/30 px-3 py-2 text-white hover:bg-black/50">◀</button>
            <button onClick={() => scrollBy(1)} aria-label="Scroll right" className="rounded-full border border-white/20 bg-black/30 px-3 py-2 text-white hover:bg-black/50">▶</button>
          </div>
        </div>
        <div
          ref={scrollerRef}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') scrollBy(1);
            if (e.key === 'ArrowLeft') scrollBy(-1);
          }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] focus:outline-none"
          style={{ scrollbarWidth: "none" }}
          role="list"
          aria-label="Experiences"
        >
          {/* Edge tension */}
          <div className="shrink-0 w-4" aria-hidden />
          {data.map((item, idx) => {
            const { ref, visible } = useReveal<HTMLAnchorElement>();
            return (
              <Link
                ref={ref}
                key={item.id}
                href={item.href}
                className={
                  "group relative shrink-0 snap-start first:ml-0 last:mr-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-400 " +
                  (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")
                }
                style={{ width: "min(85vw, 560px)", height: "320px", transitionDelay: `${idx * 80}ms` }}
              role="listitem"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, 560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-bold text-white drop-shadow-sm">{item.title}</h3>
                  {item.subtitle && (
                    <p className="mt-1 text-white/80 text-sm">{item.subtitle}</p>
                  )}
                </div>
              </Link>
            );
          })}
          {/* Edge tension */}
          <div className="shrink-0 w-4" aria-hidden />
        </div>
      </div>
    </section>
  );
}

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

function CarouselCard({ item, idx }: { item: CarouselItem; idx: number }) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      key={item.id}
      href={item.href}
      className={`group relative shrink-0 snap-start first:ml-0 last:mr-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.03] hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-white/50 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        width: "min(85vw, 560px)",
        height: "360px",
        transitionDelay: `${idx * 100}ms`,
      }}
      role="listitem"
    >
      {/* Enhanced Image with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 85vw, 560px"
        />
      </div>

      {/* Multi-layer Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        {/* Badge/Category */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
            חוויה מומלצת
          </span>
        </div>

        {/* Title with Enhanced Typography */}
        <h3 className="text-3xl font-bold text-white mb-3 leading-tight drop-shadow-lg group-hover:text-amber-300 transition-colors duration-300">
          {item.title}
        </h3>

        {item.subtitle && (
          <div className="flex items-center text-white/90 text-base mb-4">
            <svg
              className="w-4 h-4 mr-2 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="drop-shadow-sm">{item.subtitle}</p>
          </div>
        )}

        {/* Call-to-Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-white/80 text-sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            ישראל
          </div>

          <div className="flex items-center text-white/90 text-sm font-medium group-hover:text-amber-300 transition-colors duration-300">
            גלה עוד
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Heart Icon for Favorites */}
      <button
        className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white/70 hover:text-red-400 hover:bg-black/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="הוסף למועדפים"
        onClick={(e) => {
          e.preventDefault();
          // Add to favorites logic here
        }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </Link>
  );
}

export default function ExperienceCarousel({
  items,
}: {
  items?: CarouselItem[];
}) {
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
    <section className="relative py-12">
      <div className="px-6">
        {/* Enhanced Navigation Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">חוויות מומלצות</h2>
            <p className="text-white/70 text-sm">
              גלה את החוויות המרגשות ביותר בישראל
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="חזור לחוויה הקודמת"
              className="group relative rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-3 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="עבור לחוויה הבאה"
              className="group relative rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-3 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <svg
                className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>
        </div>
        <div
          ref={scrollerRef}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") scrollBy(1);
            if (e.key === "ArrowLeft") scrollBy(-1);
          }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] focus:outline-none"
          style={{ scrollbarWidth: "none" }}
          role="list"
          aria-label="Experiences"
        >
          {/* Edge tension */}
          <div className="shrink-0 w-4" aria-hidden />
          {data.map((item, idx) => (
            <CarouselCard key={item.id} item={item} idx={idx} />
          ))}
          {/* Edge tension */}
          <div className="shrink-0 w-4" aria-hidden />
        </div>
      </div>
    </section>
  );
}

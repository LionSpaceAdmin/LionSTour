"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { Reveal } from "@/components/Reveal";

export function EmotionalHero() {
  const { t } = useI18n();

  return (
    <section
      className="relative z-30 flex flex-col items-center justify-center min-h-screen text-white text-center px-4 py-20"
      style={{ zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
    >
      <Reveal delay={50}>
        <h1 className="mb-8 text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none drop-shadow-lg">
          {t("HomePage.title")}
        </h1>
      </Reveal>
      <Reveal delay={150}>
        <p className="text-white/90 mb-12 max-w-3xl text-xl md:text-2xl leading-relaxed drop-shadow-md">
          {t("HomePage.subtitle")}
        </p>
      </Reveal>
      <Reveal delay={250}>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/experiences"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {t("HomePage.exploreExperiences")}
          </Link>
          <Link
            href="/plan"
            className="px-6 py-3 rounded-full bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {t("HomePage.planJourney")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

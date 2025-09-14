"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { Reveal } from "@/components/Reveal";

export function EmotionalHero() {
  const { t } = useI18n();

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
      <Reveal delay={50}>
        <h1 className="mb-6 text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          {t("HomePage.title")}
        </h1>
      </Reveal>
      <Reveal delay={150}>
        <p className="text-white/90 mb-8 max-w-xl text-lg md:text-xl">
          {t("HomePage.subtitle")}
        </p>
      </Reveal>
      <Reveal delay={250}>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/experiences"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition-all duration-200"
          >
            {t("HomePage.exploreExperiences")}
          </Link>
          <Link
            href="/plan"
            className="border border-orange-500 text-orange-500 hover:bg-orange-100 px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200"
          >
            {t("HomePage.planJourney")}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function EmotionalHero() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 
        TODO: Replace this gradient placeholder with an actual emotional background image/video of Israeli landscape.
        The spec calls for: "emotional background image/video of Israeli landscape"
        Example: <VideoBackground src="/videos/israel-landscape.mp4" /> or <ProgressiveImage src="/images/israel-landscape.jpg" alt="Israeli Landscape" />
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-orange-300/20 to-red-400/20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-orange-100/30 to-red-100/30"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-amber-700 mb-8 leading-tight">
          {t("HomePage.title")}
        </h1>
        <p className="text-2xl md:text-3xl text-orange-700 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          {t("HomePage.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link
            href="/experiences"
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            {t("HomePage.exploreExperiences")}
          </Link>
          <Link
            href="/plan"
            className="border-2 border-amber-600 text-amber-700 px-12 py-4 rounded-full font-bold text-xl hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t("HomePage.planJourney")}
          </Link>
        </div>
      </div>
    </div>
  );
}

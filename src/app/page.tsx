"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { HeroSectionAI as Hero } from "@/components/HeroSectionAI";
import { AIJourneyPlanner } from "@/components/ai-journey-planner";
import VideoBackground from "@/components/VideoBackground";
import PlannerOverlay from "@/components/PlannerOverlay";
import ScrollScene from "@/components/ScrollScene";
import { AdminTeamPlaceLink } from "@/components/AdminTeamPlaceLink";

// Enhanced lazy-loading with beautiful skeleton screens
const PersonalStories = dynamic(
  () => import("@/components/personal-stories").then((m) => m.PersonalStories),
  {
    loading: () => (
      <div className="container mx-auto px-6 py-20">
        <div className="glass-subtle rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded-md mb-4 w-1/2 animate-shimmer" />
          <div className="h-4 bg-white/15 rounded mb-3 w-3/4" />
          <div className="h-4 bg-white/15 rounded mb-6 w-2/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-white/10 rounded-xl animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

const CommunityShowcase = dynamic(
  () =>
    import("@/components/community-showcase").then((m) => m.CommunityShowcase),
  {
    loading: () => (
      <div className="container mx-auto px-6 py-16">
        <div className="glass-subtle rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded-md mb-4 w-1/3 animate-shimmer" />
          <div className="h-32 bg-white/10 rounded-xl" />
        </div>
      </div>
    ),
    ssr: false,
  }
);

const ExperienceWindowsPreview = dynamic(
  () =>
    import("@/components/experience-windows-preview").then(
      (m) => m.ExperienceWindowsPreview
    ),
  {
    loading: () => (
      <div className="container mx-auto px-6 py-16">
        <div className="glass-subtle rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded-md mb-6 w-1/2 animate-shimmer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-64 bg-white/10 rounded-xl animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

const CallToAction = dynamic(
  () => import("@/components/call-to-action").then((m) => m.CallToAction),
  {
    loading: () => (
      <div className="container mx-auto px-6 py-16">
        <div className="glass-intense rounded-2xl p-8 text-center animate-pulse">
          <div className="h-10 bg-white/20 rounded-md mb-4 w-2/3 mx-auto animate-shimmer" />
          <div className="h-4 bg-white/15 rounded mb-8 w-1/2 mx-auto" />
          <div className="h-12 bg-white/20 rounded-full w-48 mx-auto" />
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function Home() {
  const { t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Performance optimization: preload critical resources
  useEffect(() => {
    // Preload critical images/videos for faster loading
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    preloadLink.href = "/video-poster.jpg";
    document.head.appendChild(preloadLink);

    // Cleanup
    return () => {
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink);
      }
    };
  }, []);

  return (
      <div className="relative min-h-screen w-full">
        {/* Skip to content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999]
                   bg-white text-gray-900 px-6 py-3 rounded-md font-medium shadow-lg
                   transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t("Accessibility.skipToMainContent")}
        </a>
        <VideoBackground />
        <PlannerOverlay />
        {/* Main Content with top padding for fixed nav */}
        <main id="main-content" className="relative z-20">
          <Hero />
          <AIJourneyPlanner />
          <ScrollScene speed={0.18}>
            <PersonalStories />
          </ScrollScene>
          <ScrollScene speed={0.2}>
            <CommunityShowcase />
          </ScrollScene>
          <ScrollScene speed={0.22}>
            <ExperienceWindowsPreview />
          </ScrollScene>
          <ScrollScene speed={0.24}>
            <CallToAction />
          </ScrollScene>
        </main>
      </div>
  );
}

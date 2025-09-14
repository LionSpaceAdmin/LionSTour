"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { EmotionalHero as Hero } from "@/components/hero";
import { PersonalStories } from "@/components/personal-stories";
import { CommunityShowcase } from "@/components/community-showcase";
import { ExperienceWindowsPreview } from "@/components/experience-windows-preview";
import { CallToAction } from "@/components/call-to-action";
import { AIJourneyPlanner } from "@/components/ai-journey-planner";
import VideoBackground from "@/components/VideoBackground";
import PlannerOverlay from "@/components/PlannerOverlay";
import ScrollScene from "@/components/ScrollScene";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      <PlannerOverlay />
      {/* Modern Navigation Bar */}
      <nav aria-label="Primary" className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-white/90 transition-colors"
            >
              LionSTour
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/experiences"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                {t("Navigation.experiences")}
              </Link>
              <Link
                href="/guides"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                {t("Navigation.guides")}
              </Link>
              <Link
                href="/academy"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                {t("Navigation.academy")}
              </Link>
              <Link
                href="/trust/safety"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                {t("Navigation.safety")}
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href="/auth/login"
                className="px-6 py-2 text-sm border border-white/60 rounded-md text-white hover:bg-white/10 transition-colors"
              >
                {t("Navigation.login")}
              </Link>
              <Link href="/plan" className="btn-primary px-6 py-2 text-sm">
                {t("Navigation.planJourney")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with top padding for fixed nav */}
      <div className="pt-20">
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
      </div>
    </div>
  );
}

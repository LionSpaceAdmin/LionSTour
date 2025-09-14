"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { EmotionalHero as Hero } from "@/components/hero";
import { PersonalStories } from "@/components/personal-stories";
import { CommunityShowcase } from "@/components/community-showcase";
import { ExperienceWindowsPreview } from "@/components/experience-windows-preview";
import { CallToAction } from "@/components/call-to-action";

export default function Home() {
  const { t } = useI18n();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"
      dir="rtl"
    >
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <Hero />

      <PersonalStories />

      <CommunityShowcase />

      <ExperienceWindowsPreview />

      <CallToAction />
    </div>
  );
}

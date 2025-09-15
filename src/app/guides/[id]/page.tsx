"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { PersonalStory } from "@/components/personal-story";
import { JourneyTimeline } from "@/components/journey-timeline";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { TestimonialGallery } from "@/components/testimonial-gallery";
import { CommunityConnection } from "@/components/community-connection";
import { Guide } from "@prisma/client"; // Assuming Guide type is available from Prisma

// Mock fetch since we don't have a running API in this context
const MOCK_GUIDE_DATA: { [key: string]: Partial<Guide> } = {
  david: {
    id: "david",
    name: "David Cohen",
    specialties: ["Nature", "History", "Storytelling"],
    profileImage: "/david-guide.jpg",
  },
};

export default function GuidePage() {
  const { t } = useI18n();
  const params = useParams();
  const { id } = params;

  const [guide, setGuide] = useState<Partial<Guide> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // In a real app, you'd fetch from an API.
      // We'll simulate that with our mock data.
      const guideData = MOCK_GUIDE_DATA[id as string];
      if (guideData) {
        setGuide(guideData);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (!guide) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Header */}
      <div className="relative pt-48 pb-24 text-center bg-gradient-to-b from-black via-purple-900/50 to-black">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden relative ring-4 ring-purple-500/50 shadow-2xl">
            <Image
              src={guide.profileImage || "/guides/default.jpg"}
              alt={guide.name || "Guide"}
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-5xl font-bold mt-6">{guide.name}</h1>
          <p className="text-xl text-white/70 mt-2">
            {guide.specialties?.join(", ")}
          </p>
        </div>
      </div>

      <main className="-mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-black/30 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-lg">
            {/* The components below should be adapted to a dark theme if they have hardcoded light styles */}
            {/* For now, we assume they are adaptable or will be updated next */}
            <PersonalStory guide={guide} />
            <div className="my-16 h-px bg-white/10" />
            <JourneyTimeline guide={guide} />
            <div className="my-16 h-px bg-white/10" />
            <AvailabilityCalendar guideId={id as string} />
            <div className="my-16 h-px bg-white/10" />
            <TestimonialGallery guide={guide} />
            <div className="my-16 h-px bg-white/10" />
            <CommunityConnection />
          </div>
        </div>
      </main>

      {/* Call to Action */}
      <div className="py-20 mt-20 bg-gradient-to-t from-black via-purple-900/30 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("Guide.readyToExplore")}
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            {t("Guide.readyToExploreDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/experiences"
              className="group relative inline-block px-8 py-3 text-lg font-semibold text-white bg-white/5 border-2 border-transparent rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 overflow-hidden hover:shadow-purple-500/20 hover:scale-105 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative">{t("Guide.bookExperience")}</span>
            </a>
            <a
              href="/plan"
              className="px-8 py-3 text-lg font-medium text-white/80 bg-transparent border-2 border-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/50 hover:scale-105 transform"
            >
              {t("Guide.planJourney")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

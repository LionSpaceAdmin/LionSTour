"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { PersonalStory } from "@/components/personal-story";
import { JourneyTimeline } from "@/components/journey-timeline";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { TestimonialGallery } from "@/components/testimonial-gallery";
import { CommunityConnection } from "@/components/community-connection";
import { Guide } from "@prisma/client"; // Assuming Guide type is available from Prisma

export default function GuidePage() {
  const { t } = useI18n();
  const params = useParams();
  const { id } = params;

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchGuide = async () => {
        try {
          const response = await fetch(`/api/guides/${id}`);
          if (response.ok) {
            const data = await response.json();
            setGuide(data);
          } else {
            console.error("Failed to fetch guide");
          }
        } catch (error) {
          console.error("Error fetching guide:", error);
        }
        setLoading(false);
      };
      fetchGuide();
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p>{t("Common.loading")}</p></div>;
  }

  if (!guide) {
    return <div className="min-h-screen flex items-center justify-center"><p>{t("Guide.notFound")}</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="relative py-32 bg-gradient-to-r from-amber-500 to-orange-600 text-center text-white">
        <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden relative">
          <Image
            src={guide.profileImage || "/guides/default.jpg"}
            alt={guide.name}
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-5xl font-bold">{guide.name}</h1>
        <p className="text-xl mt-2">{guide.specialties.join(", ")}</p>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <PersonalStory guide={guide} />
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <JourneyTimeline guide={guide} />
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AvailabilityCalendar guide={guide} />
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <TestimonialGallery guide={guide} />
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <CommunityConnection guide={guide} />
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("Guide.readyToExplore")}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            {t("Guide.readyToExploreDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/experiences"
              className="bg-white text-amber-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              {t("Guide.bookExperience")}
            </a>
            <a
              href="/plan"
              className="border-2 border-white text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t("Guide.planJourney")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

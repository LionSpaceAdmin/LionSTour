"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ExperienceWindows } from "@/components/experience-windows";
import { StoryFilters } from "@/components/story-filters";
import { MapView } from "@/components/map-view";
import { GuideSpotlight } from "@/components/guide-spotlight";
import { Experience } from "@prisma/client"; // Assuming Experience type is available

export default function ExperiencesPage() {
  const { t } = useI18n();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/experiences");
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
          setFilteredExperiences(data);
        } else {
          console.error("Failed to fetch experiences");
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setFilteredExperiences(experiences);
    } else {
      const filtered = experiences.filter(
        (exp) => exp.category.toLowerCase() === filter.toLowerCase()
      );
      setFilteredExperiences(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-orange-300/10 to-red-400/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            {t("Experiences.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t("Experiences.subtitle")}
          </p>
        </div>
      </div>

      <div className="py-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("Experiences.chooseYourJourney")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("Experiences.chooseYourJourneyDesc")}
            </p>
          </div>
          <StoryFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p>{t("Common.loading")}</p>
          ) : (
            <ExperienceWindows experiences={filteredExperiences} />
          )}
        </div>
      </div>

      <GuideSpotlight />

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("Experiences.exploreIsrael")}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t("Experiences.exploreIsraelDesc")}
            </p>
          </div>
          <MapView />
        </div>
      </div>
    </div>
  );
}
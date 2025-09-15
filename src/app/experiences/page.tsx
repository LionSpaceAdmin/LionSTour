"use client";

import { useI18n } from "@/hooks/useI18n";
import { StoryFilters } from "@/components/story-filters";
import ExperienceCarousel from "@/components/ExperienceCarousel";
import { GuideSpotlight } from "@/components/guide-spotlight";
import { CallToAction } from "@/components/call-to-action";
import { MapView } from "@/components/map-view";
import { useState } from "react";
import { List, Map } from "lucide-react";

export default function ExperiencesPage() {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  // Placeholder data - in a real app, this would come from an API
  const experiences = [
    {
      id: "1",
      title: t("Experiences.jerusalem.title"),
      description: t("Experiences.jerusalem.description"),
      image: "/window.svg",
      guide: { name: t("Experiences.jerusalem.guide") },
      latitude: 31.7683,
      longitude: 35.2137,
    },
    {
      id: "2",
      title: t("Experiences.telAviv.title"),
      description: t("Experiences.telAviv.description"),
      image: "/file.svg",
      guide: { name: t("Experiences.telAviv.guide") },
      latitude: 32.0853,
      longitude: 34.7818,
    },
    {
      id: "3",
      title: t("Experiences.galilee.title"),
      description: t("Experiences.galilee.description"),
      image: "/globe.svg",
      guide: { name: t("Experiences.galilee.guide") },
      latitude: 32.9206,
      longitude: 35.2993,
    },
    {
      id: "4",
      title: t("Experiences.negev.title"),
      description: t("Experiences.negev.description"),
      image: "/video-poster.jpg",
      guide: { name: t("Experiences.negev.guide") },
      latitude: 30.5329,
      longitude: 34.8592,
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Header Section */}
      <header className="relative pt-32 pb-20 text-center bg-gradient-to-b from-black via-gray-900/80 to-black">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-shadow-lg">
            {t("Experiences.title")}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
            {t("Experiences.subtitle")}
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters and View Toggle Section */}
        <section aria-labelledby="filter-heading" className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-grow">
                <StoryFilters />
            </div>
            <div className="flex-shrink-0">
                <div className="flex items-center gap-2 rounded-full bg-white/10 p-1 border border-white/20">
                    <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-white/70'}`}>
                        <List size={16} />
                        <span>List</span>
                    </button>
                    <button onClick={() => setViewMode('map')} className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${viewMode === 'map' ? 'bg-purple-600 text-white' : 'text-white/70'}`}>
                        <Map size={16} />
                        <span>Map</span>
                    </button>
                </div>
            </div>
          </div>
        </section>

        {/* Experiences Gallery / Map Section */}
        <section aria-labelledby="experiences-heading">
          <h2 id="experiences-heading" className="sr-only">
            {t("Experiences.categories.all")}
          </h2>
          {viewMode === 'list' ? (
            <ExperienceCarousel items={experiences.map(e => ({ id: e.id, title: e.title, subtitle: e.description, image: e.image, href: `/experiences/${e.id}` }))} />
          ) : (
            <MapView experiences={experiences} />
          )}
        </section>

        {/* Guide Spotlight Section */}
        <section className="mt-24">
          <GuideSpotlight />
        </section>
      </main>

      {/* Call to Action Section */}
      <div className="mt-24">
        <CallToAction />
      </div>
    </div>
  );
}

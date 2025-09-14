"use client";

import { useI18n } from "@/hooks/useI18n";

export function GuideSpotlight() {
  const { t } = useI18n();

  const guides = [
    {
      name: t("Experiences.guides.sarah.name"),
      role: t("Experiences.guides.sarah.role"),
      story: t("Experiences.guides.sarah.story"),
      image: "/sarah.jpg",
    },
    {
      name: t("Experiences.guides.ahmed.name"),
      role: t("Experiences.guides.ahmed.role"),
      story: t("Experiences.guides.ahmed.story"),
      image: "/ahmed.jpg",
    },
    {
      name: t("Experiences.guides.rachel.name"),
      role: t("Experiences.guides.rachel.role"),
      story: t("Experiences.guides.rachel.story"),
      image: "/rachel.jpg",
    },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("Experiences.guideSpotlight")}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t("Experiences.guideSpotlightDesc")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
              <img
                src={guide.image}
                alt={guide.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{guide.name}</h3>
              <p className="text-amber-600 font-semibold mb-4">{guide.role}</p>
              <p className="text-gray-700">{guide.story}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

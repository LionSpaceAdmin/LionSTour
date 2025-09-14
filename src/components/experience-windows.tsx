"use client";

import { useI18n } from "@/hooks/useI18n";
import { ProgressiveImage } from "@/components/ui/progressive-image";
import { Experience } from "@prisma/client";

interface ExperienceWindowsProps {
  experiences: Experience[];
}

export function ExperienceWindows({ experiences }: ExperienceWindowsProps) {
  const { t } = useI18n();

  if (!experiences || experiences.length === 0) {
    return <p className="text-center text-lg">{t("Experiences.noResults")}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {experiences.map((experience) => (
        <div key={experience.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <ProgressiveImage
            src={experience.images[0] || "/placeholder.jpg"}
            placeholder="/placeholder.jpg"
            alt={experience.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">{experience.title}</h3>
            <p className="text-gray-700 mb-4 h-24 overflow-hidden">{experience.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-600 pt-4 border-t">
              <span>{experience.duration} {t("Common.minutes")}</span>
              <span>${experience.price / 100}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
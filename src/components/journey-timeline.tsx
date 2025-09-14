"use client";

import { useI18n } from "@/hooks/useI18n";
import { Guide } from "@prisma/client";

interface JourneyTimelineProps {
  guide: Guide;
}

export function JourneyTimeline({ guide }: JourneyTimelineProps) {
  const { t } = useI18n();

  // The timeline data is currently static. 
  // In the future, this could come from the guide object.
  const timeline = [
    {
      year: "2010",
      title: t("Guide.timeline.2010.title"),
      description: t("Guide.timeline.2010.description"),
    },
    {
      year: "2015",
      title: t("Guide.timeline.2015.title"),
      description: t("Guide.timeline.2015.description"),
    },
    {
      year: "2020",
      title: t("Guide.timeline.2020.title"),
      description: t("Guide.timeline.2020.description"),
    },
    {
      year: "2024",
      title: t("Guide.timeline.2024.title"),
      description: t("Guide.timeline.2024.description"),
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("Guide.journey")}</h2>
      <div className="relative border-l-4 border-amber-500">
        {timeline.map((item, index) => (
          <div key={index} className="mb-8 ml-8">
            <div className="absolute -left-4 mt-1 w-8 h-8 bg-amber-500 rounded-full border-4 border-white"></div>
            <p className="text-amber-600 font-semibold">{item.year}</p>
            <h3 className="text-xl font-bold text-gray-800 mt-1">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
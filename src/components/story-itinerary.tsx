"use client";

import { useI18n } from "@/hooks/useI18n";

// Define the type for the itinerary prop, consistent with the API response
interface Itinerary {
  title: string;
  days: {
    day: number;
    title: string;
    description: string;
    experienceId: string;
    guideName: string;
    emoji: string;
    info?: string;
    tips?: string;
  }[];
}

interface StoryItineraryProps {
  itinerary: Itinerary;
}

export function StoryItinerary({ itinerary }: StoryItineraryProps) {
  const { t } = useI18n();

  if (!itinerary) {
    return null; // Or a loading/error state
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {itinerary.title}
        </h2>
        <p className="text-lg text-gray-600">
          {t("Itinerary.subtitle")}
        </p>
      </div>

      <div className="space-y-8">
        {itinerary.days.map((day) => (
          <div key={day.day} className="flex items-start space-x-6">
            <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">{day.emoji}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {t("Itinerary.day")} {day.day}: {day.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {day.description}
              </p>
              {day.info && (
                <div className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                  {day.info}
                </div>
              )}
              {day.tips && (
                <div className="mt-2 text-sm text-neutral-600">
                  <span className="font-semibold">Tips:</span> {day.tips}
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {t("Dashboard.guide")}: {day.guideName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

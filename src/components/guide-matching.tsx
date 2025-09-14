"use client";

import { useI18n } from "@/hooks/useI18n";
import { JourneyData } from "@/lib/types";

interface GuideMatchingProps {
  journeyData: JourneyData;
}

// Placeholder for guide data
const guides = [
  {
    id: "1",
    name: "David Cohen",
    image: "/guides/david.jpg", // Placeholder image path
    story: "An ex-IDF officer and nature enthusiast, David brings a unique perspective to Israeli tourism.",
    specialties: ["nature", "history", "spirituality"],
  },
  {
    id: "2",
    name: "Sarah Levi",
    image: "/guides/sarah.jpg", // Placeholder image path
    story: "An archaeologist who brings ancient stories to life with personal experiences.",
    specialties: ["history", "culture"],
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    image: "/guides/ahmed.jpg", // Placeholder image path
    story: "A cultural bridge-builder in Haifa, showcasing the beautiful diversity of Israeli society.",
    specialties: ["culture", "food"],
  },
];

export function GuideMatching({ journeyData }: GuideMatchingProps) {
  const { t } = useI18n();

  // Basic matching logic placeholder
  const matchedGuides = guides.filter(guide => 
    guide.specialties.some(specialty => journeyData.interests.includes(specialty))
  ).slice(0, 2); // Show top 2 matches

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mt-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t("GuideMatching.title")}
        </h2>
        <p className="text-lg text-gray-600">
          {t("GuideMatching.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(matchedGuides.length > 0 ? matchedGuides : guides.slice(0, 2)).map((guide) => (
          <div key={guide.id} className="bg-gray-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
            <img
              src={guide.image}
              alt={guide.name}
              loading="lazy"
              decoding="async"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-amber-200"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{guide.name}</h3>
            <p className="text-gray-600 mb-4">{guide.story}</p>
            <button className="bg-amber-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-600 transition-colors">
              {t("GuideMatching.selectGuide")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

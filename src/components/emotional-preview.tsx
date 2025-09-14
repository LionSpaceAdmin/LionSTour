"use client";

import { useI18n } from "@/hooks/useI18n";
import { JourneyData } from "@/lib/types";

interface EmotionalPreviewProps {
  journeyData: JourneyData;
}

// Placeholder for preview data
const previews = {
  history: {
    image: "/previews/history.jpg",
    title: "A Journey Through Time",
    quote: "Walk in the footsteps of kings and prophets."
  },
  nature: {
    image: "/previews/nature.jpg",
    title: "Whispers of the Wild",
    quote: "Reconnect with the earth and find your peace."
  },
  culture: {
    image: "/previews/culture.jpg",
    title: "A Mosaic of Faces",
    quote: "Meet the people who are the heart and soul of this land."
  },
  default: {
    image: "/previews/default.jpg",
    title: "Your Unforgettable Story",
    quote: "The next chapter is waiting to be written."
  }
};

export function EmotionalPreview({ journeyData }: EmotionalPreviewProps) {
  const { t } = useI18n();

  const primaryInterest = journeyData.interests[0] || "default";
  const preview = previews[primaryInterest as keyof typeof previews] || previews.default;

  return (
    <div className="mt-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t("EmotionalPreview.title")}
        </h2>
        <p className="text-lg text-gray-600">
          {t("EmotionalPreview.subtitle")}
        </p>
      </div>

      <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
        <img 
          src={preview.image} 
          alt={preview.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center text-white bg-black bg-opacity-40 p-8 rounded-2xl">
          <h3 className="text-5xl font-bold mb-4">{preview.title}</h3>
          <p className="text-2xl italic">"{preview.quote}"</p>
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
          {t("EmotionalPreview.bookNow")}
        </button>
      </div>
    </div>
  );
}

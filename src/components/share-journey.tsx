"use client";

import { useI18n } from "@/hooks/useI18n";
import { JourneyData } from "@/lib/types";

interface ShareJourneyProps {
  journeyData: JourneyData;
}

export function ShareJourney(_props: ShareJourneyProps) {
  const { t } = useI18n();

  const handleShare = (platform: string) => {
    // In a real app, this would use the platform's share API
    alert(`Sharing on ${platform}!`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mt-12 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        {t("ShareJourney.title")}
      </h2>
      <p className="text-lg text-gray-600 mb-8">{t("ShareJourney.subtitle")}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleShare("Facebook")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          Facebook
        </button>
        <button
          onClick={() => handleShare("Twitter")}
          className="bg-sky-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-600 transition-colors"
        >
          Twitter
        </button>
        <button
          onClick={() => handleShare("WhatsApp")}
          className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
        >
          WhatsApp
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="bg-gray-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition-colors"
        >
          {t("ShareJourney.copyLink")}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useI18n } from "@/hooks/useI18n";

export function PersonalStories() {
  const { t } = useI18n();

  return (
    <div className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("HomePage.personalStories")}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t("HomePage.personalStoriesDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">🎖️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {t("HomePage.veteranStories")}
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              {t("HomePage.veteranStoriesDesc")}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">🛡️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {t("HomePage.safeJourneys")}
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              {t("HomePage.safeJourneysDesc")}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">🤝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {t("HomePage.diverseCommunities")}
            </h3>
            <p className="text-gray-700 text-center leading-relaxed">
              {t("HomePage.diverseCommunitiesDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

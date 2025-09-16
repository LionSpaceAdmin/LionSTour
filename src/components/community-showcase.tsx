"use client";

import { useI18n } from "@/hooks/useI18n";

export function CommunityShowcase() {
  const { t } = useI18n();

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("HomePage.communityShowcase")}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t("HomePage.communityShowcaseDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">👤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(`HomePage.guide${i}`)}
              </h3>
              <p className="text-sm text-gray-600">
                {t(`HomePage.guide${i}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

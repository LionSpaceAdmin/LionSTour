"use client";

import { useI18n } from "@/hooks/useI18n";

export function PersonalStories() {
  const { t } = useI18n();

  return (
    <div className="section-spacing glass backdrop-blur-lg">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-hero text-responsive-lg text-neutral-900 mb-6">
            {t("HomePage.personalStories")}
          </h2>
          <p className="text-subtitle text-responsive-md text-neutral-700 max-w-3xl mx-auto text-personal">
            {t("HomePage.personalStoriesDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-glass hover-lift animate-slide-in-left">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 hover-glow">
              <span className="text-white font-bold text-2xl">🎖️</span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center text-hero">
              {t("HomePage.veteranStories")}
            </h3>
            <p className="text-neutral-700 text-center text-personal">
              {t("HomePage.veteranStoriesDesc")}
            </p>
          </div>

          <div className="card-glass hover-lift animate-fade-in">
            <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 hover-glow">
              <span className="text-white font-bold text-2xl">🛡️</span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center text-hero">
              {t("HomePage.safeJourneys")}
            </h3>
            <p className="text-neutral-700 text-center text-personal">
              {t("HomePage.safeJourneysDesc")}
            </p>
          </div>

          <div className="card-glass hover-lift animate-slide-in-right">
            <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 hover-glow">
              <span className="text-white font-bold text-2xl">🤝</span>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center text-hero">
              {t("HomePage.diverseCommunities")}
            </h3>
            <p className="text-neutral-700 text-center text-personal">
              {t("HomePage.diverseCommunitiesDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

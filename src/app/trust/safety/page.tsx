"use client";

import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { SafetyContent } from "@/components/trust/safety-content";
import { EmergencyContacts } from "@/components/trust/emergency-contacts";
import { TrustIndicators } from "@/components/trust/trust-indicators";

export default function TrustSafetyPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t("TrustSafety.title")}
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto leading-relaxed">
            {t("TrustSafety.subtitle")}
          </p>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4 text-white">
          <SafetyContent />
        </div>
      </div>

      <div className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4 text-white">
          <EmergencyContacts />
        </div>
      </div>

      <div className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4 text-white">
          <TrustIndicators />
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("TrustSafety.readyToExplore")}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            {t("TrustSafety.readyToExploreDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/experiences"
              className="bg-white text-amber-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              {t("TrustSafety.exploreExperiences")}
            </a>
            <a
              href="/plan"
              className="border-2 border-white text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t("TrustSafety.planJourney")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

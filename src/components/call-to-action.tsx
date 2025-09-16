"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";

export function CallToAction() {
  const { t } = useI18n();

  return (
    <div className="section-spacing gradient-sunset relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
      <div className="container mx-auto container-padding text-center relative z-10">
        <div className="animate-fade-in-up">
          <h2 className="text-hero text-responsive-lg text-white mb-6">
            {t("HomePage.startJourney")}
          </h2>
          <p className="text-subtitle text-responsive-md text-primary-100 mb-12 max-w-3xl mx-auto text-personal">
            {t("HomePage.startJourneyDesc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-scale-in">
            <Link
              href="/plan"
              className="btn-primary text-xl px-12 py-5 hover-lift bg-white text-primary-600 hover:bg-primary-50"
            >
              {t("HomePage.planJourney")}
            </Link>
            <Link
              href="/experiences"
              className="btn-outline text-xl px-12 py-5 hover-lift border-white text-white hover:bg-white hover:text-primary-600"
            >
              {t("HomePage.exploreExperiences")}
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 animate-fade-in">
            <Link
              href="/academy"
              className="text-white hover:text-primary-100 font-medium text-lg transition-colors hover-glow"
            >
              {t("Navigation.academy")}
            </Link>
            <span className="text-primary-200">{t("Common.linkSeparator")}</span>
            <Link
              href="/trust/safety"
              className="text-white hover:text-primary-100 font-medium text-lg transition-colors hover-glow"
            >
              {t("Common.trustSafety")}
            </Link>
            <span className="text-primary-200">{t("Common.linkSeparator")}</span>
            <Link
              href="/enterprise"
              className="text-white hover:text-primary-100 font-medium text-lg transition-colors hover-glow"
            >
              {t("Common.enterprise")}
            </Link>
            <span className="text-primary-200">{t("Common.linkSeparator")}</span>
            <Link
              href="/auth/login"
              className="text-white hover:text-primary-100 font-medium text-lg transition-colors hover-glow"
            >
              {t("Navigation.login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

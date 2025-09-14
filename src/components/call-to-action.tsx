"use client";

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";

export function CallToAction() {
  const { t } = useI18n();

  return (
    <div className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t("HomePage.startJourney")}
        </h2>
        <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
          {t("HomePage.startJourneyDesc")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/academy"
            className="text-white hover:text-amber-200 font-medium text-lg"
          >
            {t("Navigation.academy")}
          </Link>
          <span className="text-amber-200">•</span>
          <Link
            href="/trust/safety"
            className="text-white hover:text-amber-200 font-medium text-lg"
          >
            {t("Common.trustSafety")}
          </Link>
          <span className="text-amber-200">•</span>
          <Link
            href="/enterprise"
            className="text-white hover:text-amber-200 font-medium text-lg"
          >
            {t("Common.enterprise")}
          </Link>
          <span className="text-amber-200">•</span>
          <Link
            href="/auth/login"
            className="text-white hover:text-amber-200 font-medium text-lg"
          >
            {t("Navigation.login")}
          </Link>
        </div>
      </div>
    </div>
  );
}

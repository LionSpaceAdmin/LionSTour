"use client";

import { useI18n } from "@/hooks/useI18n";

export function TrustIndicators() {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {t("TrustSafety.trustStandards")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t("TrustSafety.verifiedGuides")}</h3>
          <p className="text-gray-600">{t("TrustSafety.verifiedGuidesDesc")}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t("TrustSafety.transparentPricing")}</h3>
          <p className="text-gray-600">{t("TrustSafety.transparentPricingDesc")}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t("TrustSafety.dataProtection")}</h3>
          <p className="text-gray-600">{t("TrustSafety.dataProtectionDesc")}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t("TrustSafety.qualityAssurance")}</h3>
          <p className="text-gray-600">{t("TrustSafety.qualityAssuranceDesc")}</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useI18n } from "@/hooks/useI18n";

export function SafetyContent() {
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("TrustSafety.ourCommitment")}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t("TrustSafety.commitmentDesc")}
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("TrustSafety.veteranGuides")}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t("TrustSafety.veteranGuidesDesc")}
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("TrustSafety.realTimeMonitoring")}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t("TrustSafety.realTimeMonitoringDesc")}
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("TrustSafety.emergencySupport")}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t("TrustSafety.emergencySupportDesc")}
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("TrustSafety.securePayments")}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t("TrustSafety.securePaymentsDesc")}
        </p>
      </div>
    </div>
  );
}

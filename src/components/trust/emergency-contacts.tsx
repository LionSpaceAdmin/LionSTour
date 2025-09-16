"use client";

import { useI18n } from "@/hooks/useI18n";

export function EmergencyContacts() {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {t("TrustSafety.emergencyContacts")}
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        {t("TrustSafety.emergencyContactsDesc")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="font-bold text-red-800">{t("TrustSafety.police")}</p>
          <p className="text-2xl font-bold text-red-900">100</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="font-bold text-blue-800">{t("TrustSafety.medical")}</p>
          <p className="text-2xl font-bold text-blue-900">101</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg">
          <p className="font-bold text-orange-800">{t("TrustSafety.fire")}</p>
          <p className="text-2xl font-bold text-orange-900">102</p>
        </div>
      </div>
    </div>
  );
}

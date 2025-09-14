"use client";

import { useI18n } from "@/hooks/useI18n";
import { Guide } from "@prisma/client";

interface AvailabilityCalendarProps {
  guide: Guide;
}

export function AvailabilityCalendar({ guide }: AvailabilityCalendarProps) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("Guide.availability")}</h2>
      {/* Placeholder for a real calendar component */}
      <div className="bg-gray-100 p-8 rounded-lg">
        <p className="text-center text-gray-500">{t("Common.comingSoon")}</p>
      </div>
    </div>
  );
}
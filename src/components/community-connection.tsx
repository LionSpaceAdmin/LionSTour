"use client";

import { useI18n } from "@/hooks/useI18n";
import { Guide } from "@prisma/client";

interface CommunityConnectionProps {
  guide: Guide;
}

export function CommunityConnection({ guide }: CommunityConnectionProps) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("Guide.communityConnection")}</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        {t("Guide.communityConnectionContent")}
      </p>
    </div>
  );
}
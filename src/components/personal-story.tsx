"use client";

import { useI18n } from "@/hooks/useI18n";
import { Guide } from "@prisma/client";

interface PersonalStoryProps {
  guide: Guide;
}

export function PersonalStory({ guide }: PersonalStoryProps) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("Guide.story")}</h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        {guide.bio || t("Guide.storyContent")}
      </p>
    </div>
  );
}
"use client";

import { useI18n } from "@/hooks/useI18n";
import { Guide } from "@prisma/client";

interface PersonalStoryProps {
  guide: Partial<Guide>;
}

export function PersonalStory({ guide }: PersonalStoryProps) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">{t("Guide.story")}</h2>
      <p className="text-lg text-white/80 leading-relaxed">
        {guide.bio || t("Guide.storyContent")}
      </p>
    </div>
  );
}

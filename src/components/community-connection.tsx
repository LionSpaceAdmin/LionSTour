"use client";

import { useI18n } from "@/hooks/useI18n";
export function CommunityConnection({
  title,
  content,
  imageUrl: _imageUrl,
}: {
  title?: string;
  content?: string;
  imageUrl?: string;
}) {
  const { t } = useI18n();

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        {title || t("Guide.communityConnection")}
      </h2>
      <p className="text-lg text-white/80 leading-relaxed">
        {content || t("Guide.communityConnectionContent")}
      </p>
    </div>
  );
}

"use client";

import { useI18n } from "@/hooks/useI18n";
import { InteractiveMap } from "@/components/ui/interactive-map";

export function MapView() {
  const { t } = useI18n();

  return (
    <div className="h-96">
      <InteractiveMap latitude={31.7683} longitude={35.2137} zoom={7} />
    </div>
  );
}

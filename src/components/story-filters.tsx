"use client";

import { useI18n } from "@/hooks/useI18n";
import { useState } from "react";
import { motion } from "framer-motion";

export function StoryFilters() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: t("Experiences.categories.all") },
    { id: "cultural", label: t("Experiences.categories.cultural") },
    { id: "nature", label: t("Experiences.categories.nature") },
    { id: "urban", label: t("Experiences.categories.urban") },
    { id: "adventure", label: t("Experiences.categories.adventure") },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-2xl font-semibold text-white/90">
        {t("Experiences.chooseYourJourney")}
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`relative px-5 py-2 text-md font-medium rounded-full transition-colors duration-300
              ${activeFilter === filter.id
                ? "text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
          >
            {activeFilter === filter.id && (
              <motion.div
                layoutId="activeFilterBubble"
                className="absolute inset-0 bg-purple-600/80 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

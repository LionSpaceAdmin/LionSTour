"use client";

import { useI18n } from "@/hooks/useI18n";

interface StoryFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function StoryFilters({ activeFilter, onFilterChange }: StoryFiltersProps) {
  const { t } = useI18n();

  const filters = [
    "all",
    "cultural",
    "nature",
    "urban",
    "adventure",
  ];

  return (
    <div className="flex justify-center space-x-4 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-md ${
            activeFilter === filter
              ? "bg-amber-500 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-amber-100"
          }`}
        >
          {t(`Experiences.categories.${filter}`)}
        </button>
      ))}
    </div>
  );
}
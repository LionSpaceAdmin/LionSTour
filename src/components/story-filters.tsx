"use client";

import { useI18n } from "@/hooks/useI18n";

interface StoryFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function StoryFilters({ activeFilter, onFilterChange }: StoryFiltersProps) {
  const { t } = useI18n();

  const filters = [
    { id: "all", icon: "🌍", gradient: "from-purple-500 to-pink-500" },
    { id: "cultural", icon: "🏛️", gradient: "from-blue-500 to-indigo-600" },
    { id: "nature", icon: "🌿", gradient: "from-green-500 to-emerald-600" },
    { id: "urban", icon: "🏙️", gradient: "from-gray-500 to-slate-600" },
    { id: "adventure", icon: "🏔️", gradient: "from-orange-500 to-red-600" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          aria-pressed={activeFilter === filter.id}
          className={`group relative overflow-hidden rounded-2xl px-6 py-4 font-semibold text-base transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 ${
            activeFilter === filter.id
              ? `bg-gradient-to-r ${filter.gradient} text-white shadow-2xl scale-105`
              : "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 hover:border-white/50 shadow-lg"
          }`}
        >
          {/* Background glow effect for active filter */}
          {activeFilter === filter.id && (
            <div className={`absolute inset-0 bg-gradient-to-r ${filter.gradient} opacity-20 blur-xl animate-pulse`} />
          )}

          {/* Content */}
          <div className="relative flex items-center space-x-3">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {filter.icon}
            </span>
            <span className="whitespace-nowrap">
              {t(`Experiences.categories.${filter.id}`)}
            </span>
          </div>

          {/* Hover effect ripple */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </button>
      ))}
    </div>
  );
}
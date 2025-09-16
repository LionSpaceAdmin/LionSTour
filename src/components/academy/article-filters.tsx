"use client";

type Filter = { key: string; label: string };

export function ArticleFilters({ filters, value, onChange }: { filters: Filter[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`rounded-full border px-3 py-1 text-sm ${value === f.key ? 'border-amber-500 text-amber-700' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`}
          type="button"
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}


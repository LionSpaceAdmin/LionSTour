"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/hooks/useI18n";

export function AIJourneyPlanner() {
  const { t } = useI18n();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const suggestions = [
    t("AIPlanner.suggestions.nature"),
    t("AIPlanner.suggestions.history"),
    t("AIPlanner.suggestions.cultureFood"),
    t("AIPlanner.suggestions.desert"),
  ];

  const submit = (value: string) => {
    const q = value.trim();
    if (!q) return;
    router.push(`/plan?prompt=${encodeURIComponent(q)}`);
  };

  return (
    <section className="relative -mt-10 z-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex h-6 items-center rounded-full bg-amber-100 px-3 text-xs font-semibold text-amber-700">
              {t("AIPlanner.badge")}
            </span>
            <span className="text-sm text-neutral-600">{t("AIPlanner.subtitle")}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit(prompt);
              }}
              placeholder={t("AIPlanner.placeholder")}
              className="flex-1 rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 text-neutral-800 shadow-sm outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              onClick={() => submit(prompt)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {t("AIPlanner.start")}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => submit(s)}
                className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-sm text-neutral-700 hover:bg-white"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


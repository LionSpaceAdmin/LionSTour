"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export default function PlannerOverlay() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const submit = () => {
    const v = q.trim();
    if (!v) return;
    router.push(`/plan?prompt=${encodeURIComponent(v)}`);
  };

  const suggestions = useMemo(
    () => [
      "Healing nature in the Galilee for a week",
      "Ancient Jerusalem with archaeology and local stories",
      "Art and food culture in Tel Aviv for 3 days",
      "Peaceful desert nights in the Negev",
    ],
    []
  );

  const durations = useMemo(
    () => [
      { label: "1-3d", text: "for 2 days" },
      { label: "4-7d", text: "for a week" },
      { label: "8-14d", text: "for two weeks" },
    ],
    []
  );

  const overlay = (
    <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[60] flex justify-center px-4">
      <div
        className="pointer-events-auto w-full max-w-4xl rounded-2xl border border-white/10 p-5 backdrop-blur-xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Describe your journey — e.g., Healing nature in the Galilee for a week"
            aria-label="Describe your journey"
            className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={submit}
            aria-label="Start planning"
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Start
          </button>
        </div>
        {/* Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Suggested prompts">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setQ(s)}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/90 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Use suggestion: ${s}`}
            >
              {s}
            </button>
          ))}
        </div>
        {/* Quick duration helpers */}
        <div className="mt-2 flex flex-wrap gap-2" aria-label="Quick durations">
          {durations.map((d) => (
            <button
              key={d.label}
              onClick={() =>
                setQ((prev) => `${prev.replace(/\s+for\s+.*$/i, "")} ${d.text}`.trim())
              }
              className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Add duration ${d.text}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(overlay, document.body);
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";

type Slot = { guideId: string; start: string; end: string; capacity: number };

// Removed unused AvailabilityCalendarProps

export function AvailabilityCalendar({ guideId }: { guideId: string }) {
  const { t } = useI18n();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchSlots = async () => {
      setLoading(true);
      try {
        // Mocking fetch for now as we can't rely on the API
        // const res = await fetch(`/api/availability?guideId=${encodeURIComponent(guideId)}`);
        // const data = await res.json();
        const data = { slots: [] }; // Mock response
        if (!cancelled && Array.isArray(data.slots))
          setSlots(data.slots as Slot[]);
      } catch {
        if (!cancelled) setSlots([]);
      }
      if (!cancelled) setLoading(false);
    };
    if (guideId) fetchSlots();
    return () => {
      cancelled = true;
    };
  }, [guideId]);

  const days = useMemo(() => {
    const byDay = new Map<string, Slot[]>();
    for (const s of slots) {
      const d = new Date(s.start);
      const key = d.toISOString().slice(0, 10);
      const arr = byDay.get(key) || [];
      arr.push(s);
      byDay.set(key, arr);
    }
    return Array.from(byDay.entries()).sort(([a], [b]) => (a < b ? -1 : 1));
  }, [slots]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        {t("Guide.availability")}
      </h2>
      {loading ? (
        <div className="bg-white/5 border border-white/10 p-8 rounded-lg text-center text-white/50">
          {t("Common.loading")}
        </div>
      ) : days.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-8 rounded-lg text-center text-white/50">
          {t("Guide.noAvailability") ||
            "No available slots in the next two weeks."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {days.map(([day, list]) => (
            <div
              key={day}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="text-sm text-white/50 mb-2">
                {new Date(day).toLocaleDateString("he-IL")}
              </div>
              <div className="flex flex-wrap gap-2">
                {list
                  .sort((a, b) => (a.start < b.start ? -1 : 1))
                  .map((s, i) => {
                    const time = new Date(s.start).toLocaleTimeString("he-IL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    return (
                      <button
                        key={`${s.start}-${i}`}
                        className="px-3 py-1.5 rounded-full text-sm bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors"
                        aria-label={`Start ${time}, capacity ${s.capacity}`}
                      >
                        {time} · {s.capacity}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

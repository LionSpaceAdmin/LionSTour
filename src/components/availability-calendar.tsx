"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Guide } from "@prisma/client";

type Slot = { guideId: string; start: string; end: string; capacity: number };

interface AvailabilityCalendarProps {
  guide: Guide;
}

export function AvailabilityCalendar({ guide }: AvailabilityCalendarProps) {
  const { t } = useI18n();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/availability?guideId=${encodeURIComponent(guide.id)}`);
        const data = await res.json();
        if (!cancelled && Array.isArray(data.slots)) setSlots(data.slots as Slot[]);
      } catch {
        if (!cancelled) setSlots([]);
      }
      if (!cancelled) setLoading(false);
    };
    if (guide?.id) fetchSlots();
    return () => {
      cancelled = true;
    };
  }, [guide?.id]);

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
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("Guide.availability")}</h2>
      {loading ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-500">{t("Common.loading")}</div>
      ) : days.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-500">
          {t("Guide.noAvailability") || "No available slots in the next two weeks."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {days.map(([day, list]) => (
            <div key={day} className="bg-white rounded-xl p-4 shadow border border-gray-100">
              <div className="text-sm text-gray-500 mb-2">{new Date(day).toLocaleDateString("he-IL")}</div>
              <div className="flex flex-wrap gap-2">
                {list
                  .sort((a, b) => (a.start < b.start ? -1 : 1))
                  .map((s, i) => {
                    const time = new Date(s.start).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });
                    return (
                      <button
                        key={`${s.start}-${i}`}
                        className="px-3 py-1.5 rounded-full text-sm bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
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

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

export function JourneyHistory() {
  const { t } = useI18n();
  const [journeys, setJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJourneys = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("bookings")
          .select("*, experiences(*)")
          .eq("userId", user.id)
          .eq("status", "COMPLETED");

        if (error) {
          console.error("Error fetching journeys:", error);
        } else {
          setJourneys(data);
        }
      }
      setLoading(false);
    };

    fetchJourneys();
  }, []);

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        {t("Dashboard.journeyHistory")}
      </h2>
      {loading ? (
        <p className="text-white/70">{t("Common.loading")}</p>
      ) : journeys.length === 0 ? (
        <p className="text-white/70">{t("Dashboard.noJourneys")}</p>
      ) : (
        <div className="space-y-4">
          {journeys.map((journey) => (
            <div key={journey.id} className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white">{journey.experiences.title}</h3>
              <p className="text-sm text-white/60">{t("Dashboard.journeyDate")}: {new Date(journey.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

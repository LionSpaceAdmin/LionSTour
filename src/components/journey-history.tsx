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

  if (loading) {
    return <p>{t("Common.loading")}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {t("Dashboard.journeyHistory")}
      </h2>
      {journeys.length === 0 ? (
        <p>{t("Dashboard.noJourneys")}</p>
      ) : (
        <div className="space-y-4">
          {journeys.map((journey) => (
            <div key={journey.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{journey.experiences.title}</h3>
              <p>{t("Dashboard.journeyDate")}: {new Date(journey.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

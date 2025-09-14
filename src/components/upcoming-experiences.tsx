"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

export function UpcomingExperiences() {
  const { t } = useI18n();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingExperiences = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("bookings")
          .select("*, experiences(*)")
          .eq("userId", user.id)
          .in("status", ["PENDING", "CONFIRMED"]);

        if (error) {
          console.error("Error fetching upcoming experiences:", error);
        } else {
          setExperiences(data);
        }
      }
      setLoading(false);
    };

    fetchUpcomingExperiences();
  }, []);

  if (loading) {
    return <p>{t("Common.loading")}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {t("Dashboard.upcomingExperiences")}
      </h2>
      {experiences.length === 0 ? (
        <p>{t("Dashboard.noUpcomingExperiences")}</p>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{experience.experiences.title}</h3>
              <p>{t("Dashboard.bookingDate")}: {new Date(experience.date).toLocaleDateString()}</p>
              <p>{t("Dashboard.bookingStatus")}: {experience.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

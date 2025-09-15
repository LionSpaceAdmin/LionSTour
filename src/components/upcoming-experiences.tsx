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

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        {t("Dashboard.upcomingExperiences")}
      </h2>
      {loading ? (
        <p className="text-white/70">{t("Common.loading")}</p>
      ) : experiences.length === 0 ? (
        <p className="text-white/70">{t("Dashboard.noUpcomingExperiences")}</p>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white">{experience.experiences.title}</h3>
              <p className="text-sm text-white/60">{t("Dashboard.bookingDate")}: {new Date(experience.date).toLocaleDateString()}</p>
              <p className="text-sm text-white/60">{t("Dashboard.bookingStatus")}: {experience.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

export function FavoriteGuides() {
  const { t } = useI18n();
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteGuides = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("favorite_guides")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching favorite guides:", error);
        } else if (data && data.favorite_guides) {
          const { data: guidesData, error: guidesError } = await supabase
            .from("guides")
            .select("*")
            .in("id", data.favorite_guides);

          if (guidesError) {
            console.error("Error fetching guides:", guidesError);
          } else {
            setGuides(guidesData);
          }
        }
      }
      setLoading(false);
    };

    fetchFavoriteGuides();
  }, []);

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        {t("Dashboard.favoriteGuides")}
      </h2>
      {loading ? (
        <p className="text-white/70">{t("Common.loading")}</p>
      ) : guides.length === 0 ? (
        <p className="text-white/70">{t("Dashboard.noFavoriteGuides")}</p>
      ) : (
        <div className="space-y-4">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white">{guide.name}</h3>
              <p className="text-sm text-white/60">{guide.specialties.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

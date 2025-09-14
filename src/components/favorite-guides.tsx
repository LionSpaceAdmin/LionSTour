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

  if (loading) {
    return <p>{t("Common.loading")}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {t("Dashboard.favoriteGuides")}
      </h2>
      {guides.length === 0 ? (
        <p>{t("Dashboard.noFavoriteGuides")}</p>
      ) : (
        <div className="space-y-4">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{guide.name}</h3>
              <p className="text-gray-600">{guide.specialties.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

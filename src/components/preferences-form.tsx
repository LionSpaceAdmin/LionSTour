"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

export function PreferencesForm() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<string[]>([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("preferences")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching preferences:", error);
        } else if (data) {
          setPreferences(data.preferences || []);
        }
      }
      setLoading(false);
    };

    fetchPreferences();
  }, []);

  const handleUpdatePreferences = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("users")
        .update({ preferences })
        .eq("id", user.id);

      if (error) {
        alert(error.message);
      } else {
        alert(t("Dashboard.preferencesUpdated"));
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setPreferences((prev) => [...prev, value]);
    } else {
      setPreferences((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        {t("Dashboard.preferencesManagement")}
      </h2>
      {loading ? (
        <p className="text-white/70">{t("Common.loading")}</p>
      ) : (
        <form onSubmit={handleUpdatePreferences} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              "history",
              "nature",
              "culture",
              "food",
              "adventure",
              "spirituality",
            ].map((item) => (
              <div key={item} className="flex items-center">
                <input
                  id={item}
                  type="checkbox"
                  value={item}
                  checked={preferences.includes(item)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <label htmlFor={item} className="ms-2 block text-sm text-white/70">
                  {t(`Plan.interests.options.${item}`)}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full group relative inline-block px-8 py-3 text-lg font-semibold text-white bg-white/5 border-2 border-transparent rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 overflow-hidden hover:shadow-purple-500/20 hover:scale-105 transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative">{t("Dashboard.updatePreferences")}</span>
          </button>
        </form>
      )}
    </div>
  );
}

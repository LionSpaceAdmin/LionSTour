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

  if (loading) {
    return <p>{t("Common.loading")}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {t("Dashboard.preferencesManagement")}
      </h2>
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
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor={item} className="ml-2 block text-sm text-gray-700">
                {t(`Plan.interests.options.${item}`)}
              </label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 transform hover:scale-105"
        >
          {t("Dashboard.updatePreferences")}
        </button>
      </form>
    </div>
  );
}

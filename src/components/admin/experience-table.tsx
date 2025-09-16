"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

export function ExperiencesManagement() {
  const { t } = useI18n();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase.from("experiences").select("*, guides(name)");
      if (error) {
        console.error("Error fetching experiences:", error);
      } else {
        setExperiences(data);
      }
      setLoading(false);
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return <p>{t("Common.loading")}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("Dashboard.experiencesManagement")}
        </h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          {t("Dashboard.addExperience")}
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">{t("Common.title")}</th>
            <th className="py-2">{t("Dashboard.guide")}</th>
            <th className="py-2">{t("Common.price")}</th>
            <th className="py-2">{t("Common.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => (
            <tr key={experience.id}>
              <td className="border px-4 py-2">{experience.title}</td>
              <td className="border px-4 py-2">{experience.guides.name}</td>
              <td className="border px-4 py-2">{experience.price}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2">
                  {t("Common.edit")}
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-lg">
                  {t("Common.delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

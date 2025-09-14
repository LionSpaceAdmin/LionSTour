"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

export function GuidesManagement() {
  const { t } = useI18n();
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      const { data, error } = await supabase.from("guides").select("*");
      if (error) {
        console.error("Error fetching guides:", error);
      } else {
        setGuides(data);
      }
      setLoading(false);
    };

    fetchGuides();
  }, []);

  if (loading) {
    return <p>{t("Common.loading")}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("Dashboard.guidesManagement")}
        </h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          {t("Dashboard.addGuide")}
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">{t("Common.name")}</th>
            <th className="py-2">{t("Common.email")}</th>
            <th className="py-2">{t("Dashboard.isVeteran")}</th>
            <th className="py-2">{t("Common.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide) => (
            <tr key={guide.id}>
              <td className="border px-4 py-2">{guide.name}</td>
              <td className="border px-4 py-2">{guide.email}</td>
              <td className="border px-4 py-2">{guide.isVeteran ? t("Common.yes") : t("Common.no")}</td>
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

"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/hooks/useI18n";

type Item = { id: string; title?: string; name?: string; isActive?: boolean };

export function ModerationTools() {
  const { t } = useI18n();
  const [experiences, setExperiences] = useState<Item[]>([]);
  const [guides, setGuides] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [exps, gids] = await Promise.all([
          fetch("/api/experiences").then((r) => r.json()).catch(() => []),
          fetch("/api/guides").then((r) => r.json()).catch(() => []),
        ]);
        setExperiences(Array.isArray(exps) ? exps : []);
        setGuides(Array.isArray(gids) ? gids : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = async (type: "experience" | "guide", id: string, value: boolean) => {
    const res = await fetch(`/api/admin/moderation/${type}s`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: value }),
    });
    if (res.ok) {
      if (type === "experience") setExperiences((xs) => xs.map((x) => (x.id === id ? { ...x, isActive: value } : x)));
      else setGuides((xs) => xs.map((x) => (x.id === id ? { ...x, isActive: value } : x)));
    }
  };

  if (loading) return <p>{t("Common.loading")}</p>;

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-4 text-xl font-semibold">{t("Dashboard.experiencesModeration")}</h3>
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-neutral-50">
                <th className="p-2 text-left">{t("Common.title")}</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-left">{t("Common.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="p-2">{e.title}</td>
                  <td className="p-2">{String(e.isActive ?? true)}</td>
                  <td className="p-2">
                    <button
                      onClick={() => toggle("experience", e.id, !(e.isActive ?? true))}
                      className="rounded border px-3 py-1 hover:bg-neutral-50"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-xl font-semibold">{t("Dashboard.guidesModeration")}</h3>
        <div className="overflow-x-auto rounded border">
          <table className="min-w-full bg-white text-sm">
            <thead>
              <tr className="bg-neutral-50">
                <th className="p-2 text-left">{t("Common.name")}</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-left">{t("Common.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((g) => (
                <tr key={g.id} className="border-t">
                  <td className="p-2">{g.name}</td>
                  <td className="p-2">{String(g.isActive ?? true)}</td>
                  <td className="p-2">
                    <button
                      onClick={() => toggle("guide", g.id, !(g.isActive ?? true))}
                      className="rounded border px-3 py-1 hover:bg-neutral-50"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

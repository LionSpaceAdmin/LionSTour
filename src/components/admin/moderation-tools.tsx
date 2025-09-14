"use client";

import { useEffect, useState, useTransition } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { toggleExperienceActive as ToggleExpAction, toggleGuideActive as ToggleGuideAction } from "@/app/dashboard/admin/actions";

type Item = { id: string; title?: string; name?: string; isActive?: boolean };

export function ModerationTools({
  onToggleExperience,
  onToggleGuide,
}: {
  onToggleExperience: typeof ToggleExpAction;
  onToggleGuide: typeof ToggleGuideAction;
}) {
  const { t } = useI18n();
  const [experiences, setExperiences] = useState<Item[]>([]);
  const [guides, setGuides] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

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

  const toggle = (type: "experience" | "guide", id: string, value: boolean) => {
    startTransition(async () => {
      try {
        if (type === "experience") {
          await onToggleExperience(id, value);
          setExperiences((xs) => xs.map((x) => (x.id === id ? { ...x, isActive: value } : x)));
        } else {
          await onToggleGuide(id, value);
          setGuides((xs) => xs.map((x) => (x.id === id ? { ...x, isActive: value } : x)));
        }
      } catch (e) {
        console.error(e);
      }
    });
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
                      className="rounded border px-3 py-1 hover:bg-neutral-50 disabled:opacity-50"
                      disabled={isPending}
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
                      className="rounded border px-3 py-1 hover:bg-neutral-50 disabled:opacity-50"
                      disabled={isPending}
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

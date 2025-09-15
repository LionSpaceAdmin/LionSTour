"use client";

import React from "react";
import { useI18n } from "@/hooks/useI18n";
import type { ImpactReport } from "@/lib/impact";

export function ImpactDashboard({ report }: { report: ImpactReport }) {
  const { t } = useI18n();

  const total = report.totalAmount || 0; // cents
  const regions = report.breakdown.length;
  const totalBookings = report.breakdown.reduce((s, b) => s + b.bookings, 0);
  const maxAmount = Math.max(1, ...report.breakdown.map((b) => b.amount));

  const formatCurrency = (cents: number) => `₪${Math.round(cents / 100).toLocaleString("he-IL")}`;

  return (
    <section aria-labelledby="impact-title" className="space-y-10">
      <header className="text-center">
        <h1 id="impact-title" className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          {t("Impact.title") || "Impact Transparency"}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          {t("Impact.subtitle") || "See how bookings support local guides and communities."}
        </p>
        <p className="mt-2 text-sm text-white/60">
          {t("Impact.updated") || "Data updated"}: {new Date(report.lastUpdated).toLocaleString("he-IL")}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/10" role="status" aria-label="Total impact amount">
          <div className="text-white/70 text-sm mb-2">{t("Impact.total") || "Total Impact"}</div>
          <div className="text-3xl font-bold text-white">{formatCurrency(total)}</div>
        </div>

        <div className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/10" role="status" aria-label="Regions covered">
          <div className="text-white/70 text-sm mb-2">{t("Impact.regions") || "Regions"}</div>
          <div className="text-3xl font-bold text-white">{regions}</div>
        </div>

        <div className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/10" role="status" aria-label="Total bookings counted">
          <div className="text-white/70 text-sm mb-2">{t("Impact.bookings") || "Bookings"}</div>
          <div className="text-3xl font-bold text-white">{totalBookings}</div>
        </div>
      </div>

      <section aria-labelledby="impact-breakdown" className="rounded-3xl bg-white p-6 md:p-8">
        <h2 id="impact-breakdown" className="text-2xl font-bold text-gray-900 mb-4">
          {t("Impact.byRegion") || "Impact by Region"}
        </h2>

        {report.breakdown.length === 0 || total === 0 ? (
          <p className="text-gray-600" role="note">
            {t("Impact.empty") || "No bookings yet. Impact will appear after your first bookings."}
          </p>
        ) : (
          <ul className="space-y-4">
            {report.breakdown.map((item) => {
              const pct = Math.round((item.amount / maxAmount) * 100);
              return (
                <li key={item.location} className="flex items-center gap-4">
                  <div className="w-28 shrink-0 text-sm font-medium text-gray-800" aria-label="Region name">
                    {item.location}
                  </div>
                  <div className="flex-1">
                    <div
                      className="relative h-3 rounded-full bg-gray-100"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={pct}
                      aria-label={`${item.location} impact proportion`}
                    >
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-40 text-right text-sm text-gray-700" aria-label="Amount and bookings count">
                    <span className="font-semibold text-gray-900">{formatCurrency(item.amount)}</span>
                    <span className="text-gray-500"> · {item.bookings} {t("Impact.bookings") || "bookings"}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </section>
  );
}


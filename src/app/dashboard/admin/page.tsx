"use client";

import { useI18n } from "@/hooks/useI18n";

import { GuidesManagement } from "@/components/admin/guide-table";

import { ExperiencesManagement } from "@/components/admin/experience-table";

import { BookingsManagement } from "@/components/admin/booking-table";

import { ModerationTools } from "@/components/admin/moderation-tools";

export default function AdminDashboardPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t("Dashboard.title")}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <GuidesManagement />
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <ExperiencesManagement />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <BookingsManagement />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <ModerationTools />
          </div>
        </div>
      </div>
    </div>
  );
}

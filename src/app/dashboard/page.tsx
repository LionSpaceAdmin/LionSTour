"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

import dynamic from "next/dynamic";

const BookingList = dynamic(() => import("@/components/booking-list").then(mod => mod.BookingList), { ssr: false });
const UpcomingExperiences = dynamic(() => import("@/components/upcoming-experiences").then(mod => mod.UpcomingExperiences), { ssr: false });
const ProfileSettings = dynamic(() => import("@/components/profile-settings").then(mod => mod.ProfileSettings), { ssr: false });
const PreferencesForm = dynamic(() => import("@/components/preferences-form").then(mod => mod.PreferencesForm), { ssr: false });
const JourneyHistory = dynamic(() => import("@/components/journey-history").then(mod => mod.JourneyHistory), { ssr: false });
const FavoriteGuides = dynamic(() => import("@/components/favorite-guides").then(mod => mod.FavoriteGuides), { ssr: false });

export default function DashboardPage() {
  const { t } = useI18n();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20">
      <div className="max-w-4xl mx-auto w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("Dashboard.title")}
          </h1>
          {user && (
            <p className="text-xl text-gray-600">
              {t("Dashboard.welcome")} {user.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <BookingList />
            <UpcomingExperiences />
          </div>
          <div className="space-y-8">
            <ProfileSettings />
            <PreferencesForm />
            <JourneyHistory />
            <FavoriteGuides />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="w-1/2 flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105"
          >
            {t("Dashboard.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}

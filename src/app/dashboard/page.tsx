"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">
            {t("Dashboard.title")}
          </h1>
          {user && (
            <p className="text-xl text-white/70">
              {t("Dashboard.welcome")} {user.email}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BookingList />
            <UpcomingExperiences />
            <JourneyHistory />
          </div>
          <div className="space-y-8">
            <ProfileSettings />
            <PreferencesForm />
            <FavoriteGuides />
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 text-lg font-medium text-red-400 bg-transparent border-2 border-red-400/50 rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-red-400/10 hover:text-red-300 hover:border-red-400 transform hover:scale-105"
          >
            {t("Dashboard.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}

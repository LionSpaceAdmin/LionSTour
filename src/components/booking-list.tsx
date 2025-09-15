"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

export function BookingList() {
  const { t } = useI18n();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("bookings")
          .select("*, experiences(*, guides(*)) ")
          .eq("userId", user.id);

        if (error) {
          console.error("Error fetching bookings:", error);
        } else {
          setBookings(data);
        }
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        {t("Dashboard.bookingManagement")}
      </h2>
      {loading ? (
        <p className="text-white/70">{t("Common.loading")}</p>
      ) : bookings.length === 0 ? (
        <p className="text-white/70">{t("Dashboard.noBookings")}</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-white">{booking.experiences.title}</h3>
              <p className="text-white/60">{booking.experiences.guides.name}</p>
              <p className="text-sm text-white/60">{t("Dashboard.bookingDate")}: {new Date(booking.date).toLocaleDateString()}</p>
              <p className="text-sm text-white/60">{t("Dashboard.bookingStatus")}: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

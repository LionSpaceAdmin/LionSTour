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

  if (loading) {
    return <p>{t("Common.loading")}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {t("Dashboard.bookingManagement")}
      </h2>
      {bookings.length === 0 ? (
        <p>{t("Dashboard.noBookings")}</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{booking.experiences.title}</h3>
              <p className="text-gray-600">{booking.experiences.guides.name}</p>
              <p>{t("Dashboard.bookingDate")}: {new Date(booking.date).toLocaleDateString()}</p>
              <p>{t("Dashboard.bookingStatus")}: {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

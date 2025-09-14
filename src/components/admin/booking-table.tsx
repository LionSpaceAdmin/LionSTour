"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/hooks/useI18n";

export function BookingsManagement() {
  const { t } = useI18n();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, experiences(title), users(name)");
      if (error) {
        console.error("Error fetching bookings:", error);
      } else {
        setBookings(data);
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
        {t("Dashboard.bookingsManagement")}
      </h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">{t("Common.user")}</th>
            <th className="py-2">{t("Common.experience")}</th>
            <th className="py-2">{t("Dashboard.bookingDate")}</th>
            <th className="py-2">{t("Dashboard.bookingStatus")}</th>
            <th className="py-2">{t("Common.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.users.name}</td>
              <td className="border px-4 py-2">{booking.experiences.title}</td>
              <td className="border px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{booking.status}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded-lg mr-2">
                  {t("Common.approve")}
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-lg">
                  {t("Common.cancel")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

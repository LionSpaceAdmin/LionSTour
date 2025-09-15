import { supabase } from "@/lib/supabase";

export const IMPACT_RATE = 0.15; // 15% of booking totalPrice contributes to impact (in cents)

export type ImpactBreakdownItem = {
  location: string;
  amount: number; // cents
  bookings: number;
};

export type ImpactReport = {
  totalAmount: number; // cents
  breakdown: ImpactBreakdownItem[];
  lastUpdated: string; // ISO timestamp
};

type BookingRow = {
  totalPrice?: number | null;
  // Supabase relational select: bookings -> experiences(location)
  experiences?: { location?: string | null } | null;
  // Optional direct location for fallback
  location?: string | null;
};

export function calculateImpact(rows: BookingRow[]): ImpactReport {
  const map = new Map<string, { amount: number; bookings: number }>();

  for (const row of rows) {
    const price = typeof row.totalPrice === "number" ? row.totalPrice : 0;
    const impactCents = Math.max(0, Math.round(price * IMPACT_RATE));
    const locRaw = row.experiences?.location ?? row.location ?? "Unknown";
    const location = (locRaw || "Unknown").trim() || "Unknown";

    const curr = map.get(location) || { amount: 0, bookings: 0 };
    curr.amount += impactCents;
    curr.bookings += 1;
    map.set(location, curr);
  }

  const breakdown: ImpactBreakdownItem[] = Array.from(map.entries())
    .map(([location, v]) => ({ location, amount: v.amount, bookings: v.bookings }))
    .sort((a, b) => b.amount - a.amount);

  const totalAmount = breakdown.reduce((sum, b) => sum + b.amount, 0);
  return {
    totalAmount,
    breakdown,
    lastUpdated: new Date().toISOString(),
  };
}

// Sample fallback data for local/dev when Supabase is not configured
const sampleBookings: BookingRow[] = [
  { totalPrice: 45000, experiences: { location: "Jerusalem" } },
  { totalPrice: 38000, experiences: { location: "Tel Aviv" } },
  { totalPrice: 52000, experiences: { location: "Galilee" } },
  { totalPrice: 42000, experiences: { location: "Haifa" } },
  { totalPrice: 68000, experiences: { location: "Negev" } },
];

export async function loadImpactReport(): Promise<ImpactReport> {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("totalPrice, experiences(location)");

    if (!error && Array.isArray(data)) {
      return calculateImpact(data as unknown as BookingRow[]);
    }
  } catch {
    // ignore and fall back to sample
  }

  // Fallback to sample data to keep the UI functional during local dev
  return calculateImpact(sampleBookings);
}

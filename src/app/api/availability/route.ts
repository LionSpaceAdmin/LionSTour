import { errorJson, okJson } from "@/lib/http";
import { rateLimit } from "@/lib/rateLimit";
import { supabase } from "@/lib/supabase";

type Slot = {
  guideId: string;
  start: string; // ISO
  end: string; // ISO
  capacity: number;
};

function generateSampleSlots(
  guideId: string,
  startDate?: Date,
  days: number = 14
): Slot[] {
  const slots: Slot[] = [];
  const base = startDate ? new Date(startDate) : new Date();
  base.setHours(0, 0, 0, 0);
  for (let d = 0; d < days; d++) {
    const day = new Date(base);
    day.setDate(base.getDate() + d);
    for (const hour of [9, 14]) {
      const s = new Date(day);
      s.setHours(hour, 0, 0, 0);
      const _e = new Date(s);
      _e.setHours(_e.getHours() + 3);
      slots.push({
        guideId,
        start: s.toISOString(),
        end: _e.toISOString(),
        capacity: 8,
      });
    }
  }
  return slots;
}

export async function GET(req: Request) {
  const rl = rateLimit("availability:get", 60, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);

  const { searchParams } = new URL(req.url);
  const guideId = (searchParams.get("guideId") || "").trim();
  const start = searchParams.get("start");
  const _end = searchParams.get("end");

  if (!guideId) return errorJson("Missing guideId", 400);

  // Try Supabase 'availability' table if present; fall back to generated slots
  try {
    const { data, error } = await supabase
      .from("availability")
      .select("guideId, start, end, capacity")
      .eq("guideId", guideId)
      .limit(200);

    if (!error && Array.isArray(data) && data.length > 0) {
      return okJson({ slots: data, lastUpdated: new Date().toISOString() });
    }
  } catch {
    // ignore
  }

  const startDate = start ? new Date(start) : undefined;
  const slots = generateSampleSlots(guideId, startDate);
  return okJson({ slots, lastUpdated: new Date().toISOString() });
}

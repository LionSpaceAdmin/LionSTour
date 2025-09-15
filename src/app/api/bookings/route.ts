import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";
import { errorJson, okJson } from "@/lib/http";

export async function GET() {
  const rl = rateLimit("bookings:get", 30, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);
  const { data, error } = await supabase
    .from("bookings")
    .select("*, experiences(title), users(name)");

  if (error) return errorJson(error.message, 500);

  return okJson(data);
}

export async function POST(req: NextRequest) {
  const rl = rateLimit("bookings:post", 10, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);
  const {
    date,
    guests,
    totalPrice,
    status,
    stripeId,
    notes,
    userId,
    experienceId,
    guideId,
  } = await req.json();

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        date,
        guests,
        totalPrice,
        status,
        stripeId,
        notes,
        userId,
        experienceId,
        guideId,
      },
    ])
    .select();

  if (error) return errorJson(error.message, 500);

  return okJson(data[0]);
}

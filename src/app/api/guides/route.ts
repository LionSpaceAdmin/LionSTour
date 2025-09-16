import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";
import { errorJson, okJson } from "@/lib/http";

export async function GET() {
  const rl = rateLimit("guides:get", 60, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);
  const { data, error } = await supabase.from("guides").select("*");

  if (error) return errorJson(error.message, 500);

  return okJson(data);
}

export async function POST(req: NextRequest) {
  const rl = rateLimit("guides:post", 20, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);
  const { name, email, bio, profileImage, isVeteran, languages, specialties } =
    await req.json();

  const { data, error } = await supabase
    .from("guides")
    .insert([
      { name, email, bio, profileImage, isVeteran, languages, specialties },
    ])
    .select();

  if (error) return errorJson(error.message, 500);

  return okJson(data[0]);
}

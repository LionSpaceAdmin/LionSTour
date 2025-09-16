import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";
import { errorJson, okJson } from "@/lib/http";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const rl = rateLimit(`guides:get:${id}`, 60, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return errorJson(error.message, 500);

  if (!data) return errorJson("Not found", 404);

  return okJson(data);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { name, email, bio, profileImage, isVeteran, languages, specialties } =
    await req.json();

  const { data, error } = await supabase
    .from("guides")
    .update({
      name,
      email,
      bio,
      profileImage,
      isVeteran,
      languages,
      specialties,
    })
    .eq("id", id)
    .select();

  if (error) return errorJson(error.message, 500);

  return okJson(data[0]);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { error } = await supabase.from("guides").delete().eq("id", id);

  if (error) return errorJson(error.message, 500);

  return new Response(null, { status: 204 });
}

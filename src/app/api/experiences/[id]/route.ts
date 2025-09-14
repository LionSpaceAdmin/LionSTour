import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";
import { errorJson, okJson } from "@/lib/http";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const rl = rateLimit(`experiences:get:${id}`, 60, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);
  const { data, error } = await supabase
    .from("experiences")
    .select("*, guides(name)")
    .eq("id", id)
    .single();

  if (error) return errorJson(error.message, 500);

  if (!data) return errorJson("Not found", 404);

  return okJson(data);
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { title, description, duration, price, maxGuests, category, location, latitude, longitude, images, guideId } = await req.json();

  const { data, error } = await supabase
    .from("experiences")
    .update({ title, description, duration, price, maxGuests, category, location, latitude, longitude, images, guideId })
    .eq("id", id)
    .select();

  if (error) return errorJson(error.message, 500);

  return okJson(data[0]);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { error } = await supabase.from("experiences").delete().eq("id", id);

  if (error) return errorJson(error.message, 500);

  return new Response(null, { status: 204 });
}

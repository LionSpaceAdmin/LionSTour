import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("bookings").select("*, experiences(title), users(name)");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { date, guests, totalPrice, status, stripeId, notes, userId, experienceId, guideId } = await req.json();

  const { data, error } = await supabase
    .from("bookings")
    .insert([{ date, guests, totalPrice, status, stripeId, notes, userId, experienceId, guideId }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}

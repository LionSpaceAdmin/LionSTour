import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("experiences").select("*, guides(name)");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { title, description, duration, price, maxGuests, category, location, latitude, longitude, images, guideId } = await req.json();

  const { data, error } = await supabase
    .from("experiences")
    .insert([{ title, description, duration, price, maxGuests, category, location, latitude, longitude, images, guideId }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}

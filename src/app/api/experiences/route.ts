import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";
import { okJson, errorJson } from "@/lib/http";

// Fallback sample data for local development without Supabase
const sampleExperiences = [
  {
    id: "sample-jerusalem",
    title: "Jerusalem: Ancient & Sacred",
    description:
      "Walk through 3000 years of history with guides who know every stone and story",
    duration: 240,
    price: 45000,
    maxGuests: 8,
    category: "cultural",
    location: "Jerusalem",
    latitude: 31.7683,
    longitude: 35.2137,
    images: ["/window.svg"],
    guideId: "sample-sarah",
    guides: { name: "Sarah" },
    is_active: true,
    isActive: true,
    is_featured: true,
    isFeatured: true,
  },
  {
    id: "sample-telaviv",
    title: "Tel Aviv: Modern & Vibrant",
    description:
      "Discover the pulse of modern Israel through its most dynamic city",
    duration: 180,
    price: 38000,
    maxGuests: 10,
    category: "urban",
    location: "Tel Aviv",
    latitude: 32.0853,
    longitude: 34.7818,
    images: ["/globe.svg"],
    guideId: "sample-rachel",
    guides: { name: "Rachel" },
    is_active: true,
    isActive: true,
  },
  {
    id: "sample-galilee",
    title: "Galilee: Nature & Spirit",
    description:
      "Connect with nature and spirituality in Israel's most beautiful region",
    duration: 360,
    price: 52000,
    maxGuests: 6,
    category: "nature",
    location: "Galilee",
    latitude: 32.7959,
    longitude: 35.5312,
    images: ["/file.svg"],
    guideId: "sample-david",
    guides: { name: "David" },
    is_active: true,
    isActive: true,
  },
];

export async function GET() {
  // Basic rate limit: 60 req / 60s per process (dev-scope)
  const key = "experiences:get";
  const rl = rateLimit(key, 60, 60_000);
  if (!rl.allowed) return errorJson("Too Many Requests", 429);
  try {
    // Attempt Supabase first
    const { data, error } = await supabase
      .from("experiences")
      .select("*, guides(name)");

    if (!error && Array.isArray(data)) {
      return okJson(data);
    }

    // If Supabase error or empty, fall back to local sample data
    return okJson(sampleExperiences);
  } catch (_) {
    // Network/ENV failure — return sample data to keep dev UX working
    return okJson(sampleExperiences);
  }
}

export async function POST(req: NextRequest) {
  const { title, description, duration, price, maxGuests, category, location, latitude, longitude, images, guideId } = await req.json();

  const { data, error } = await supabase
    .from("experiences")
    .insert([{ title, description, duration, price, maxGuests, category, location, latitude, longitude, images, guideId }])
    .select();

  if (error) {
    return errorJson(error.message, 500);
  }

  return okJson(data[0]);
}

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { supabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const rl = rateLimit("enterprise:partner", 20, 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  }

  const body = await req.json();
  const { organizationName, contactPerson, email, phone, groupSize, message } =
    body ?? {};

  if (!organizationName || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const admin = getSupabaseAdmin();
  try {
    if (admin) {
      const { error } = await admin.from("partner_inquiries").insert({
        organization_name: organizationName,
        contact_person: contactPerson ?? null,
        email,
        phone: phone ?? null,
        group_size: groupSize ?? null,
        message: message ?? null,
      });
      if (error) throw error;
    } else {
      // Fallback: attempt anon insert if RLS allows; otherwise, accept without persistence
      const { error: _anonErr } = await supabase
        .from("partner_inquiries")
        .insert({
          organization_name: organizationName,
          contact_person: contactPerson ?? null,
          email,
          phone: phone ?? null,
          group_size: groupSize ?? null,
          message: message ?? null,
        });
      // ignore anonErr intentionally
    }
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

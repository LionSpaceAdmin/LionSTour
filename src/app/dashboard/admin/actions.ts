"use server";

import { prisma } from "@/lib/prisma";
import { getSupabaseServer } from "@/lib/supabaseServer";

async function requireAdmin() {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || profile.role !== "admin") throw new Error("Forbidden");
}

export async function toggleExperienceActive(id: string, isActive: boolean) {
  await requireAdmin();
  const updated = await prisma.experience.update({ where: { id }, data: { isActive } });
  return { id: updated.id, isActive: updated.isActive };
}

export async function toggleGuideActive(id: string, isActive: boolean) {
  await requireAdmin();
  const updated = await prisma.guide.update({ where: { id }, data: { isActive } });
  return { id: updated.id, isActive: updated.isActive };
}

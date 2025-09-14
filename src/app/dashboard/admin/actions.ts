"use server";

import { prisma } from "@/lib/prisma";
import { getSupabaseServer } from "@/lib/supabaseServer";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

async function requireAdmin() {
  const supabase = await getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || profile.role !== "admin") throw new Error("Forbidden");
}

export async function toggleExperienceActive(id: string, isActive: boolean) {
  await requireAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) {
    // Fallback to Prisma
    const updated = await prisma.experience.update({ where: { id }, data: { isActive } });
    return { id: updated.id, isActive: updated.isActive };
  }
  const { error } = await admin.from('experiences').update({ is_active: isActive }).eq('id', id);
  if (error) throw new Error(error.message);
  return { id, isActive };
}

export async function toggleGuideActive(id: string, isActive: boolean) {
  await requireAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) {
    const updated = await prisma.guide.update({ where: { id }, data: { isActive } });
    return { id: updated.id, isActive: updated.isActive };
  }
  const { error } = await admin.from('guides').update({ is_active: isActive }).eq('id', id);
  if (error) throw new Error(error.message);
  return { id, isActive };
}

export async function setUserRole(userId: string, role: 'user' | 'admin') {
  await requireAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) throw new Error('Service role not configured');
  const { error } = await admin.from('profiles').upsert({ id: userId, role }, { onConflict: 'id' });
  if (error) throw new Error(error.message);
  return { id: userId, role };
}

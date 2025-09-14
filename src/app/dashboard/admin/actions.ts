"use server";

import { prisma } from "@/lib/prisma";
import { getSupabaseServer } from "@/lib/supabaseServer";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

async function requireAdmin() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile || profile.role !== "admin") throw new Error("Forbidden");
  return user.id as string;
}

async function writeAudit(
  action: string,
  targetType: string,
  targetId: string,
  actorId: string,
  metadata?: Record<string, unknown>
) {
  const admin = getSupabaseAdmin();
  if (!admin) return; // skip if no service role
  await admin.from("audit_logs").insert({
    actor_user_id: actorId,
    action,
    target_type: targetType,
    target_id: targetId,
    metadata: metadata ? JSON.stringify(metadata) : null,
  });
}

export async function toggleExperienceActive(id: string, isActive: boolean) {
  const actorId = await requireAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) {
    // Fallback to Prisma
    const updated = await prisma.experience.update({
      where: { id },
      data: { isActive },
    });
    await writeAudit("toggle_experience", "experience", id, actorId, {
      isActive,
    });
    return { id: updated.id, isActive: updated.isActive };
  }
  const { error } = await admin
    .from("experiences")
    .update({ is_active: isActive })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await writeAudit("toggle_experience", "experience", id, actorId, {
    isActive,
  });
  return { id, isActive };
}

export async function toggleGuideActive(id: string, isActive: boolean) {
  const actorId = await requireAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) {
    const updated = await prisma.guide.update({
      where: { id },
      data: { isActive },
    });
    await writeAudit("toggle_guide", "guide", id, actorId, { isActive });
    return { id: updated.id, isActive: updated.isActive };
  }
  const { error } = await admin
    .from("guides")
    .update({ is_active: isActive })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await writeAudit("toggle_guide", "guide", id, actorId, { isActive });
  return { id, isActive };
}

export async function setUserRole(userId: string, role: "user" | "admin") {
  const actorId = await requireAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) throw new Error("Service role not configured");
  const { error } = await admin
    .from("profiles")
    .upsert({ id: userId, role }, { onConflict: "id" });
  if (error) throw new Error(error.message);
  await writeAudit("set_user_role", "user", userId, actorId, { role });
  return { id: userId, role };
}

export async function toggleExperienceFeatured(
  id: string,
  isFeatured: boolean
) {
  const actorId = await requireAdmin();
  const admin = getSupabaseAdmin();
  if (!admin) {
    const updated = await prisma.experience.update({
      where: { id },
      data: { isFeatured },
    });
    await writeAudit("toggle_experience_featured", "experience", id, actorId, {
      isFeatured,
    });
    return { id: updated.id, isFeatured: updated.isFeatured };
  }
  const { error } = await admin
    .from("experiences")
    .update({ is_featured: isFeatured })
    .eq("id", id);
  if (error) throw new Error(error.message);
  await writeAudit("toggle_experience_featured", "experience", id, actorId, {
    isFeatured,
  });
  return { id, isFeatured };
}

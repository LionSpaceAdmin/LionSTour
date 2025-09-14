"use server";

import { prisma } from "@/lib/prisma";

export async function toggleExperienceActive(id: string, isActive: boolean) {
  const updated = await prisma.experience.update({ where: { id }, data: { isActive } });
  return { id: updated.id, isActive: updated.isActive };
}

export async function toggleGuideActive(id: string, isActive: boolean) {
  const updated = await prisma.guide.update({ where: { id }, data: { isActive } });
  return { id: updated.id, isActive: updated.isActive };
}


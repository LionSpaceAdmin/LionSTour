import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  const { id, isActive } = await req.json();
  if (!id || typeof isActive !== 'boolean') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const updated = await prisma.guide.update({ where: { id }, data: { isActive } });
  return NextResponse.json({ id: updated.id, isActive: updated.isActive });
}


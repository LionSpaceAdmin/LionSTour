import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request) {
  const { id, isActive } = await req.json();
  if (!id || typeof isActive !== 'boolean') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  // Optional admin token enforcement
  const token = process.env.ADMIN_API_TOKEN;
  if (token) {
    const auth = req.headers.get('authorization') || '';
    const ok = auth.toLowerCase().startsWith('bearer ') && auth.slice(7) === token;
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const updated = await prisma.experience.update({ where: { id }, data: { isActive } });
  return NextResponse.json({ id: updated.id, isActive: updated.isActive });
}

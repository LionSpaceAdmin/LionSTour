// Prisma Accelerate + Edge-compatible client
// Requires DATABASE_URL like: prisma+postgres://accelerate.prisma-data.net/?api_key=... (set in env)
import { PrismaClient } from '@prisma/client/edge';
import type { PrismaClient as PrismaClientNodeType } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

type PrismaX = PrismaClientNodeType;

const globalForPrisma = globalThis as unknown as { prisma?: PrismaX };

function isAccelerateUrl(url: string | undefined): boolean {
  return typeof url === 'string' && url.startsWith('prisma+postgres://');
}

function createClient(): PrismaX {
  if (!isAccelerateUrl(process.env.DATABASE_URL)) {
    throw new Error(
      'Prisma Accelerate DATABASE_URL is required (prisma+postgres://...). Set it to use the database.'
    );
  }
  const base = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
  return base.$extends(withAccelerate()) as unknown as PrismaX;
}

const handler: ProxyHandler<any> = {
  get(_target, prop) {
    const instance = (globalForPrisma.prisma ??= createClient());
    return (instance as any)[prop as any];
  },
};

// Lazy proxy: avoids constructing a client during import time (prevents dev SSR crashes)
export const prisma = new Proxy({} as unknown as PrismaX, handler) as PrismaX;

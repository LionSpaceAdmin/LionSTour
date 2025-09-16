// Simple in-memory rate limiter for dev and small deployments.
// Not suitable for multi-instance production environments.

type Bucket = { count: number; expiresAt: number };

const g = globalThis as unknown as { __RATE_LIMIT__?: Map<string, Bucket> };
const windowStore: Map<string, Bucket> =
  g.__RATE_LIMIT__ || new Map<string, Bucket>();
g.__RATE_LIMIT__ = windowStore;

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = windowStore.get(key);
  if (!existing || existing.expiresAt < now) {
    windowStore.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (existing.count < limit) {
    existing.count += 1;
    return { allowed: true, remaining: limit - existing.count };
  }
  return {
    allowed: false,
    remaining: 0,
    retryAfter: Math.ceil((existing.expiresAt - now) / 1000),
  };
}

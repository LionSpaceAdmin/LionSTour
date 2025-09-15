import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const locales = ['en', 'he'];
const defaultLocale = 'he';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

// Simple in-memory rate limiting (best-effort; not durable across serverless instances)
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQ = 60; // 60 req/min per IP per path group
const buckets = new Map<string, { count: number; resetAt: number }>();

function hit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQ - 1, resetAt: now + WINDOW_MS };
  }
  if (bucket.count >= MAX_REQ) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }
  bucket.count += 1;
  return { allowed: true, remaining: MAX_REQ - bucket.count, resetAt: bucket.resetAt };
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // First, check for API routes for rate limiting
  const protectedPaths = ['/api/chat', '/api/rag'];
  const isApiProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isApiProtected) {
    if (process.env.DISABLE_RATE_LIMIT === '1') return NextResponse.next();

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const key = `${ip}:${protectedPaths.find((p) => pathname.startsWith(p))}`;
    const res = hit(key);
    if (!res.allowed) {
      const resp = NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      resp.headers.set('Retry-After', String(Math.ceil((res.resetAt - Date.now()) / 1000)));
      return resp;
    }
    const resp = NextResponse.next();
    resp.headers.set('X-RateLimit-Limit', String(MAX_REQ));
    resp.headers.set('X-RateLimit-Remaining', String(res.remaining));
    return resp;
  }

  // If not an API route, apply i18n middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next|.*\..*).*)', '/api/chat/:path*', '/api/rag/:path*'],
};

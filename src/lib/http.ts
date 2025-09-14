import { NextResponse } from 'next/server';

type ErrorPayload = { error: { message: string; code?: string; details?: unknown } };

export function okJson<T>(data: T, init?: number | ResponseInit) {
  if (typeof init === 'number') return NextResponse.json<T>(data, { status: init });
  return NextResponse.json<T>(data, init);
}

export function errorJson(message: string, status = 500, extras?: { code?: string; details?: unknown }) {
  const payload: ErrorPayload = { error: { message, ...extras } };
  return NextResponse.json(payload, { status });
}


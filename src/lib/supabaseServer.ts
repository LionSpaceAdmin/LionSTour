import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function getSupabaseServer() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  const store: any = cookieStore as any;
  return createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return store.get(name)?.value;
      },
      set(name: string, value: string, options: any = {}) {
        // Support both modern and object signature
        try {
          store.set(name, value, options);
        } catch {
          store.set({ name, value, ...options });
        }
      },
      remove(name: string, options: any = {}) {
        try {
          store.set(name, '', { ...options, maxAge: 0 });
        } catch {
          store.set({ name, value: '', ...options, maxAge: 0 });
        }
      },
    },
  } as any);
}

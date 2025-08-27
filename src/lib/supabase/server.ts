/*
================================================================================
 FILE: src/lib/supabase/server.ts (UPDATE THIS FILE)
 DESC: This is the definitive, correct version that handles asynchronous cookies.
================================================================================
*/
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// FIX: The createClient function MUST be async.
export async function createClient() {
  // FIX: The 'await' keyword here is CRITICAL and resolves the error.
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // This is expected when called from a read-only environment like a Server Component.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // This is expected when called from a read-only environment like a Server Component.
          }
        },
      },
    }
  )
}

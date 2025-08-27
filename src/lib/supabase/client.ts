/*
================================================================================
 FILE: src/lib/supabase/client.ts (Create this new folder and file)
 DESC: Initializes the Supabase client for use in Client Components.
================================================================================
*/
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
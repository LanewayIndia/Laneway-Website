import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using service role key.
 * Only use in API routes / server actions — never expose to the browser.
 */
export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}

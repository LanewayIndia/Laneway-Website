import { createClient } from "@supabase/supabase-js";
import { getPublicEnv } from './env';

/**
 * Server-side Supabase client using service role key.
 * Only use in API routes / server actions — never expose to the browser.
 */
export async function createServerSupabaseClient() {
  const env = await getPublicEnv();
  return createClient(
    env.supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}

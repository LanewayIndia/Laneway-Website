import { createClient } from "@supabase/supabase-js"
import { getPublicEnv } from './env';

let supabaseClient: ReturnType<typeof createClient> | null = null;

export { supabaseClient as supabase };

export async function getSupabase() {
  if (supabaseClient) return supabaseClient;

  const env = await getPublicEnv();
  if (!env) throw new Error('Failed to load environment configuration');
  supabaseClient = createClient(env.supabaseUrl, env.supabaseAnonKey);
  return supabaseClient;
}

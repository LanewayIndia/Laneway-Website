import { createClient } from "@supabase/supabase-js"
import { getPublicEnv } from './env';

let supabaseClient: ReturnType<typeof createClient> | null = null;

export async function getSupabase() {
  if (supabaseClient) return supabaseClient;

  const env = await getPublicEnv();
  supabaseClient = createClient(env.supabaseUrl, env.supabaseAnonKey);
  return supabaseClient;
}

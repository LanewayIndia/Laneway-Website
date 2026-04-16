import { createClient } from "@supabase/supabase-js"
import { getPublicEnv } from './env';

let supabaseClient: ReturnType<typeof createClient> | null = null;
let inFlightInitPromise: Promise<ReturnType<typeof createClient> | null> | null = null;

export { supabaseClient as supabase };

export async function getSupabase() {
  if (supabaseClient) return supabaseClient;
  if (inFlightInitPromise) return inFlightInitPromise;

  inFlightInitPromise = (async () => {
    try {
      const env = await getPublicEnv();
      if (!env) {
        console.error('Failed to load environment configuration: Missing env payload');
        return null;
      }
      supabaseClient = createClient(env.supabaseUrl, env.supabaseAnonKey);
      return supabaseClient;
    } catch (err) {
      console.error('Error during Supabase initialization:', err);
      return null;
    } finally {
      inFlightInitPromise = null;
    }
  })();

  return inFlightInitPromise;
}

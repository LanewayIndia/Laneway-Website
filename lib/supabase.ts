import { createClient } from "@supabase/supabase-js"

// Workaround for Supabase 'Refresh Token Not Found' annoying dev overlay error
if (typeof window !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const firstArg = args[0];
    
    // Check if the error is the specific Supabase Refresh Token error
    const isSupabaseRefreshError = 
      (typeof firstArg === 'string' && firstArg.includes('Refresh Token Not Found')) ||
      (firstArg && typeof firstArg === 'object' && firstArg.message?.includes('Refresh Token Not Found'));

    if (isSupabaseRefreshError) {
      // Safely ignore this known benign error that occurs when local sessions expire
      return;
    }
    
    // Otherwise, call the original console.error
    originalConsoleError(...args);
  };
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

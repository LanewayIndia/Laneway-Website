"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Callback() {
  const router = useRouter()

  useEffect(()=>{
    // Parse the OAuth redirect URL and establish the session.
    // Some @supabase/supabase-js versions may not expose
    // `getSessionFromUrl` on the typed client. Cast to `any`
    // and handle the result with proper typing to avoid TS errors.
    const handleCallback = async () => {
      try {
        const res = await (supabase.auth as any).getSessionFromUrl();
        const data: unknown = res?.data ?? null
        const error: unknown = res?.error ?? null

        if (error) {
          router.push("/home")
          return
        }

        // session established
        router.push("/")
      } catch (err) {
        router.push("/")
      }
    }

    handleCallback()
  },[router])

  return <p className="text-center mt-20 text-snow">Signing you in...</p>
}

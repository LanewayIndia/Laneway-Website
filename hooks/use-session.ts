import { useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email?: string
  name?: string
  phone?: string
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let subscription: any = null;

    const initAuth = async () => {
      const supabase = await getSupabase();
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      try {
        const { data } = await supabase.auth.getSession()
        
        if (data?.session?.user) {
          const authUser = data.session.user
          
          // Fetch user profile from profiles table
          const { data: profileData } = await (supabase as any)
            .from("profiles")
            .select("name, phone")
            .eq("id", authUser.id)
            .single()

          setUser({
            id: authUser.id,
            email: authUser.email,
            name: profileData?.name,
            phone: profileData?.phone,
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Session fetch error:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }

      // Listen for auth changes
      const { data: authData } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
          })
        } else {
          setUser(null)
        }
      })
      subscription = authData.subscription;
    }

    initAuth();

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  return { user, loading }
}

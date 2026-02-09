import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
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
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        
        if (data?.session?.user) {
          const authUser = data.session.user
          
          // Fetch user profile from profiles table
          const { data: profileData } = await supabase
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
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  return { user, loading }
}

"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleAuth = async () => {
    setLoading(true)

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (!error) {
        await supabase.auth.signInWithPassword({ email, password })
        onClose()
      } else alert(error.message)
    }

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (!error) onClose()
      else alert(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Blur backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl p-8 w-105">

        <h2 className="font-heading text-3xl text-snow mb-6 text-center">
          Begin Your Transformation
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-3 p-3 rounded-lg bg-background border border-border text-snow"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg bg-background border border-border text-snow"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-gold text-background py-3 rounded-full font-semibold"
        >
          {mode==="signin" ? "Sign In" : "Create Account"}
        </button>

        <p
          className="text-center text-pumice mt-6 cursor-pointer"
          onClick={()=>setMode(mode==="signin"?"signup":"signin")}
        >
          {mode==="signin"
            ? "New here? Create account"
            : "Already have an account? Sign in"}
        </p>

      </div>
    </div>
  )
}

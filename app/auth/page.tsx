"use client"
import { use, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const signUp = async () => {
        setLoading(true)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            }
        })

        alert(error ? error.message : "check your email for OTP")
        setLoading(false)
    }

    const signIn = async () => {
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        alert(error ? error.message : "Welcome back!")
        setLoading(false)
    }

    const googleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
        })
    }

    const linkedinLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "linkedin_oidc",
        })
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="bg-card p-10 rounded-2xl w-96">

                <h1 className="text-3xl font-heading text-snow mb-6">
                    Begin Your Transformation
                </h1>

                <input
                    className="w-full p-3 mb-3 rounded bg-black text-white"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full p-3 mb-3 rounded bg-black text-white"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={signUp}
                    disabled={loading}
                    className="w-full bg-gold text-black p-3 rounded mb-3"
                >
                    Sign Up
                </button>

                <button
                    onClick={signIn}
                    disabled={loading}
                    className="w-full bg-gold text-black p-3 rounded"
                >
                    Sign In
                </button>

                <div className="mt-6 space-y-2">

                    <button onClick={googleLogin} className="w-full border p-3 rounded">
                        Continue with Google
                    </button>

                    <button onClick={linkedinLogin} className="w-full border p-3 rounded">
                        Continue with LinkedIn
                    </button>

                </div>

            </div>
        </div>
    )
}

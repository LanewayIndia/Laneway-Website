"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Eye, EyeOff,Github, Linkedin, X } from "lucide-react"
import { motion } from "framer-motion"

export default function AuthPage() {
  const router = useRouter()

  const [mode, setMode] = useState<"signin"|"signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // OTP States
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [emailOtpVerified, setEmailOtpVerified] = useState(false)
  const [emailOtp, setEmailOtp] = useState("")
  const [phoneOtpSent, setPhoneOtpSent] = useState(false)
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false)
  const [phoneOtp, setPhoneOtp] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)

  // Send OTP to email
  const sendEmailOtp = async () => {
    if (!email) {
      setErrorMsg("Please enter email")
      return
    }
    setOtpLoading(true)
    setErrorMsg(null)
    try {
      // Call backend API to send email OTP
      const response = await fetch("/api/auth/send-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const result = await response.json()
      if (response.ok) {
        setEmailOtpSent(true)
      } else {
        setErrorMsg(result.error || "Failed to send OTP")
      }
    } catch (err) {
      setErrorMsg("Error sending OTP")
    } finally {
      setOtpLoading(false)
    }
  }

  // Verify email OTP
  const verifyEmailOtp = async () => {
    if (!emailOtp || emailOtp.length !== 6) {
      setErrorMsg("Please enter valid 6-digit OTP")
      return
    }
    setOtpLoading(true)
    setErrorMsg(null)
    try {
      const response = await fetch("/api/auth/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: emailOtp }),
      })
      const result = await response.json()
      if (response.ok) {
        setEmailOtpVerified(true)
      } else {
        setErrorMsg(result.error || "Invalid OTP")
      }
    } catch (err) {
      setErrorMsg("Error verifying OTP")
    } finally {
      setOtpLoading(false)
    }
  }

  // // Send OTP to phone
  // const sendPhoneOtp = async () => {
  //   if (!phone) {
  //     setErrorMsg("Please enter phone number")
  //     return
  //   }
  //   setOtpLoading(true)
  //   setErrorMsg(null)
  //   try {
  //     const response = await fetch("/api/auth/send-phone-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ phone }),
  //     })
  //     const result = await response.json()
  //     if (response.ok) {
  //       setPhoneOtpSent(true)
  //     } else {
  //       setErrorMsg(result.error || "Failed to send OTP")
  //     }
  //   } catch (err) {
  //     setErrorMsg("Error sending OTP")
  //   } finally {
  //     setOtpLoading(false)
  //   }
  // }

  // // Verify phone OTP
  // const verifyPhoneOtp = async () => {
  //   if (!phoneOtp || phoneOtp.length !== 6) {
  //     setErrorMsg("Please enter valid 6-digit OTP")
  //     return
  //   }
  //   setOtpLoading(true)
  //   setErrorMsg(null)
  //   try {
  //     const response = await fetch("/api/auth/verify-phone-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ phone, otp: phoneOtp }),
  //     })
  //     const result = await response.json()
  //     if (response.ok) {
  //       setPhoneOtpVerified(true)
  //     } else {
  //       setErrorMsg(result.error || "Invalid OTP")
  //     }
  //   } catch (err) {
  //     setErrorMsg("Error verifying OTP")
  //   } finally {
  //     setOtpLoading(false)
  //   }
  // }

  const handleAuth = async () => {
    setErrorMsg(null)
    setLoading(true)
    if (mode==="signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setErrorMsg(error.message)
        setLoading(false)
        return
      }

      // If signUp does not return a session (email confirmation flow), sign in explicitly
      const signInRes = await supabase.auth.signInWithPassword({ email, password })
      if (signInRes.error) {
        setErrorMsg(signInRes.error.message)
        setLoading(false)
        return
      }

      const user = signInRes.data?.user ?? data?.user
      if (user) {
        // create or update a profile row in Supabase (table: profiles)
        try {
          await supabase.from('profiles').upsert({ id: user.id, email: user.email, name, phone })
        } catch (e) {
          // non-fatal: continue
        }
      }

      setLoading(false)
      router.push("/")
    }

    if (mode==="signin") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMsg(error.message)
        setLoading(false)
        return
      }

      const user = data?.user
      if (user) {
        try {
          await supabase.from('profiles').upsert({ id: user.id, email: user.email, name, phone })
        } catch (e) {}
      }

      setLoading(false)
      router.push("/")
    }
    setLoading(false)
  }

  const socialLogin = async (
    provider:
      | "google"
      | "linkedin_oidc"
      | "github"
  ) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-card border border-border p-8 sm:p-10 rounded-2xl w-full max-w-md"
      >
        {/* Close button visible on all devices */}
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05, rotate: 20 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          aria-label="Close and go back to home"
          className="absolute -top-4 right-4 sm:-top-5 sm:right-5 z-30 bg-background/70 backdrop-blur rounded-full p-2 sm:p-3 border border-border shadow-md focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <X size={18} />
        </motion.button>

        <h1 className="font-heading text-3xl text-snow mb-6 text-center">
          Begin Your Transformation
        </h1>

        {/* Name */}
        {mode === "signup" && (
          <input
            placeholder="Full Name"
            value={name}
            className="w-full mb-3 p-3 rounded-lg bg-background border border-border text-snow"
            onChange={(e)=>setName(e.target.value)}
          />
        )}

        {/* Email */}
        <div className="relative mb-3">
          <input
            placeholder="Email"
            value={email}
            disabled={mode === "signup" && emailOtpVerified}
            className="w-full p-3 rounded-lg bg-background border border-border text-snow disabled:opacity-50"
            onChange={(e)=>setEmail(e.target.value)}
          />
          {mode === "signup" && (
            <button
              type="button"
              onClick={sendEmailOtp}
              disabled={emailOtpSent || otpLoading || !email}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gold text-sm disabled:opacity-50"
            >
              {emailOtpVerified ? "✓" : emailOtpSent ? "Resend" : "Send OTP"}
            </button>
          )}
        </div>

        {/* Email OTP Verification */}
        {mode === "signup" && emailOtpSent && !emailOtpVerified && (
          <input
            placeholder="Email OTP (6 digits)"
            value={emailOtp}
            maxLength={6}
            className="w-full mb-3 p-3 rounded-lg bg-background border border-border text-snow"
            onChange={(e)=>setEmailOtp(e.target.value.replace(/\D/g, ''))}
          />
        )}

        {mode === "signup" && emailOtpSent && !emailOtpVerified && (
          <button
            type="button"
            onClick={verifyEmailOtp}
            disabled={otpLoading || emailOtp.length !== 6}
            className="w-full mb-3 bg-slate-600 text-snow py-2 rounded-lg disabled:opacity-50"
          >
            {otpLoading ? "Verifying..." : "Verify Email OTP"}
          </button>
        )}

        {/* Phone */}
        {/* {mode === "signup" && (
          <div className="relative mb-3">
            <input
              placeholder="Phone Number"
              value={phone}
              disabled={phoneOtpVerified}
              className="w-full p-3 rounded-lg bg-background border border-border text-snow disabled:opacity-50"
              onChange={(e)=>setPhone(e.target.value)}
            />
            <button
              type="button"
              onClick={sendPhoneOtp}
              disabled={phoneOtpSent || otpLoading || !phone}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gold text-sm disabled:opacity-50"
            >
              {phoneOtpVerified ? "✓" : phoneOtpSent ? "Resend" : "Send OTP"}
            </button>
          </div>
        )} */}

        {/* Phone OTP Verification */}
        {/* {mode === "signup" && phoneOtpSent && !phoneOtpVerified && (
          <input
            placeholder="Phone OTP (6 digits)"
            value={phoneOtp}
            maxLength={6}
            className="w-full mb-3 p-3 rounded-lg bg-background border border-border text-snow"
            onChange={(e)=>setPhoneOtp(e.target.value.replace(/\D/g, ''))}
          />
        )}

        {mode === "signup" && phoneOtpSent && !phoneOtpVerified && (
          <button
            type="button"
            onClick={verifyPhoneOtp}
            disabled={otpLoading || phoneOtp.length !== 6}
            className="w-full mb-3 bg-slate-600 text-snow py-2 rounded-lg disabled:opacity-50"
          >
            {otpLoading ? "Verifying..." : "Verify Phone OTP"}
          </button>
        )} */}

        {/* Password + Eye */}
        <div className="relative mb-4">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            className="w-full p-3 rounded-lg bg-background border border-border text-snow"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={()=>setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-pumice"
          >
            {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        </div>

        {/* Main Auth Button */}
        <button
          onClick={handleAuth}
          disabled={loading || (mode === "signup" && (!emailOtpVerified || !phoneOtpVerified))}
          className="w-full bg-gold text-background py-3 rounded-full font-semibold disabled:opacity-60"
        >
          {loading ? (mode==="signin" ? "Signing in..." : "Creating account...") : (mode==="signin"?"Sign In":"Create Account")}
        </button>

        {errorMsg && <p className="text-red-400 text-center mt-2">{errorMsg}</p>}

        {/* Switch Mode */}
        <p
          className="text-center text-pumice mt-4 cursor-pointer"
          onClick={()=>setMode(mode==="signin"?"signup":"signin")}
        >
          {mode==="signin"
            ?"New here? Create account"
            :"Already have an account? Sign in"}
        </p>

        {/* Divider */}
        <div className="my-6 text-center text-pumice">OR</div>

        {/* Social Buttons with Icons */}
        <div className="space-y-3">

          <button
            onClick={()=>socialLogin("google")}
            className="w-full border border-border py-3 rounded-lg text-snow flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.48-.98 7.31-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.74 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* <button
            onClick={()=>socialLogin("linkedin_oidc")}
            className="w-full border border-border py-3 rounded-lg text-snow flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <Linkedin size={20} className="text-blue-600" />
            Continue with LinkedIn
          </button> */}

          <button
            onClick={()=>socialLogin("github")}
            className="w-full border border-border py-3 rounded-lg text-snow flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <Github size={20} />
            Continue with GitHub
          </button>

          {/* <button
            onClick={()=>socialLogin("facebook")}
            className="w-full border border-border py-3 rounded-lg text-snow flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <Facebook size={20} className="text-blue-500" />
            Continue with Facebook
          </button> */}

        </div>

      </motion.div>
    </div>
  )
}

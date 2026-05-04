import { NextRequest, NextResponse } from "next/server"
import { emailOtpStore } from "../send-email-otp/route"

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP required" }, { status: 400 })
    }

    const storedData = emailOtpStore[email]

    if (!storedData) {
      return NextResponse.json({ error: "No OTP requested for this email" }, { status: 400 })
    }

    // Check expiration
    if (Date.now() > storedData.expiresAt) {
      delete emailOtpStore[email]
      return NextResponse.json({ error: "OTP expired" }, { status: 400 })
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // OTP verified - clean up
    delete emailOtpStore[email]

    return NextResponse.json({ success: true, message: "Email verified successfully" })
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

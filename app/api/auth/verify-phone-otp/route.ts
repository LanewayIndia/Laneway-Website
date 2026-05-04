import { NextRequest, NextResponse } from "next/server"
import { phoneOtpStore } from "../send-phone-otp/route"

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 })
    }

    const storedData = phoneOtpStore[phone]

    if (!storedData) {
      return NextResponse.json({ error: "No OTP requested for this phone" }, { status: 400 })
    }

    // Check expiration
    if (Date.now() > storedData.expiresAt) {
      delete phoneOtpStore[phone]
      return NextResponse.json({ error: "OTP expired" }, { status: 400 })
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // OTP verified - clean up
    delete phoneOtpStore[phone]

    return NextResponse.json({ success: true, message: "Phone verified successfully" })
  } catch (error) {
    console.error("Phone OTP verification error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

import { NextRequest, NextResponse } from "next/server"

// Store phone OTPs in memory (in production, use database with expiration)
const phoneOtpStore: Record<string, { otp: string; expiresAt: number }> = {}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!phone || phone.length < 10) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 10-minute expiration
    phoneOtpStore[phone] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    }

    // TODO: Send SMS via Twilio, AWS SNS, or other SMS provider
    // Example Twilio integration:
    // const twilio = require('twilio')(accountSid, authToken);
    // await twilio.messages.create({
    //   body: `Your Laneway verification code is: ${otp}. Do not share this OTP.`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phone
    // });

    // For development, log the OTP
    console.log(`Phone OTP for ${phone}: ${otp}`)

    return NextResponse.json({ success: true, message: "OTP sent to phone number" })
  } catch (error) {
    console.error("Phone OTP send error:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

// Export store for verification
export { phoneOtpStore }

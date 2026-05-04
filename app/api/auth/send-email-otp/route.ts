import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Store OTPs in memory (in production, use database with expiration)
const emailOtpStore: Record<string, { otp: string; expiresAt: number }> = {}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 10-minute expiration
    emailOtpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    }

    // Send email via SMTP (using your env config)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_CONTACT_USER,
          pass: process.env.SMTP_CONTACT_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_CONTACT_USER,
        to: email,
        subject: "Your Email Verification OTP - Laneway",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Email Verification</h2>
            <p>Your OTP is:</p>
            <h1 style="color: #FCD34D; text-align: center; letter-spacing: 5px;">${otp}</h1>
            <p>This OTP will expire in 10 minutes.</p>
            <p>Do not share this OTP with anyone.</p>
          </div>
        `,
      })

      return NextResponse.json({ success: true, message: "OTP sent to email" })
    } catch (emailErr) {
      console.error("Email send error:", emailErr)
      // Still return success - OTP is stored
      return NextResponse.json({ success: true, message: "OTP generated (email may have failed)" })
    }
  } catch (error) {
    console.error("OTP send error:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

// Export store for verification (in production, this should be in a database)
export { emailOtpStore }

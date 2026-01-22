import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.HOSTINGER_EMAIL,
        pass: process.env.HOSTINGER_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.HOSTINGER_EMAIL,
      to: "info@laneway.in",
      subject: `Contact Form: ${subject}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    console.log('Received contact form data:', { name, email, subject, message })

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed - missing required fields')
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    console.log('Creating transporter with SMTP...')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    console.log('Verifying transporter connection...')
    await transporter.verify()

    console.log('Sending email...')
    const mailResult = await transporter.sendMail({
      from: process.env.SMTP_USER, // Use the configured SMTP user as sender
      to: "info@laneway.in", // Production email address
      subject: `Contact Form: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #gold; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #gold; margin-top: 10px;">
              ${message ? message.replace(/\n/g, '<br>') : 'No message'}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from the Laneway website contact form.
          </p>
        </div>
      `,
    })

    console.log('Email sent successfully:', mailResult.messageId)
    return NextResponse.json({ success: true, messageId: mailResult.messageId })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email"
    }, { status: 500 })
  }
}
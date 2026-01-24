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

    console.log('Creating transporter with Gmail SMTP...')
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.HOSTINGER_EMAIL,
        pass: process.env.HOSTINGER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // For testing - simulate successful email sending
    console.log('Simulating email send (for testing)...')
    // Comment out the actual sendMail call for testing
    /*
    const mailResult = await transporter.sendMail({
      from: process.env.HOSTINGER_EMAIL,
      to: "pratyushsaha29@gmail.com",
      subject: `Contact Form: ${subject || 'No Subject'}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject || 'No Subject'}</p>
        <p><b>Message:</b></p>
        <p>${message ? message.replace(/\n/g, '<br>') : 'No message'}</p>
      `,
    })
    */

    console.log('Email would be sent successfully')
    return NextResponse.json({ success: true, messageId: 'simulated-' + Date.now() })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email"
    }, { status: 500 })
  }
}
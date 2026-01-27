
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { rateLimit, getClientIp } from "@/lib/security"

// Simple sanitization to prevent header/content injection
function sanitize(input: string) {
  return input.replace(/[<>"'`\\]/g, "").trim();
}

export async function POST(req: Request) {
  try {
    const ip = await getClientIp();
    if (!rateLimit(ip, Number(process.env.RATE_LIMIT_MAX_REQUESTS))) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const body = await req.json();
    if (body.companyWebsite) {
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Sanitize and validate required fields
    const name = sanitize(body.name || "");
    const email = sanitize(body.email || "");
    const subject = sanitize(body.subject || "No Subject");
    const message = sanitize(body.message || "");

    if (!name || !email || !message) {
      return new NextResponse(JSON.stringify({ success: false, error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "hostinger",
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_CONTACT_USER,
        pass: process.env.SMTP_CONTACT_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Laneway Website" <${process.env.SMTP_CONTACT_USER}>`,
      to: "info@laneway.in",
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #gold; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #gold; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from the Laneway website contact form.
          </p>
        </div>
      `,
    });

    // Never return user data in response
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    // Log only generic error server-side
    console.error("Email sending error");
    return new NextResponse(JSON.stringify({ success: false, error: "Failed to send message. Please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}
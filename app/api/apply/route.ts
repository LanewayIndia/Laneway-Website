
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Simple sanitization to prevent header/content injection
function sanitize(input: string) {
  return (typeof input === "string" ? input.replace(/[<>"'`\\]/g, "").trim() : "");
}

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    // Sanitize and validate required fields
    const name = sanitize((data.get("name") ?? "") as string);
    const email = sanitize((data.get("email") ?? "") as string);
    const job = sanitize((data.get("job") ?? "") as string);
    const portfolio = sanitize((data.get("portfolio") ?? "") as string);
    const coverLetter = sanitize((data.get("coverLetter") ?? "") as string);

    if (!name || !email || !job) {
      return new NextResponse(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "hostinger",
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.HR_EMAIL,
        pass: process.env.HR_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.HR_EMAIL,
      to: "hr@laneway.in",
      subject: `New Application - ${job}`,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Job:</b> ${job}</p>
        <p><b>Portfolio:</b> ${portfolio}</p>
        <p>${coverLetter}</p>
      `,
    });

    // Never return user data in response
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    // Log only generic error server-side
    console.error("Error submitting application");
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}

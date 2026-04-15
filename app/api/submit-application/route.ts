import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { rateLimit, getClientIp } from "@/lib/security"

function sanitize(input: string) {
  return input.replace(/[<>"'`\\]/g, "").trim()
}

function createTransporter() {
  return nodemailer.createTransport({
    host: (process.env.SMTP_HOST || "smtp.hostinger.com").trim(),
    port: Number((process.env.SMTP_PORT || "587").trim()),
    secure: false,
    auth: {
      user: (process.env.SMTP_HR_USER || "").trim(),
      pass: (process.env.SMTP_HR_PASS || "").trim(),
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })
}

export async function POST(request: NextRequest) {
  try {
    const ip = await getClientIp()
    if (!rateLimit(ip, Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 10)) {
      return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 })
    }

    const formData = await request.formData()

    // Honeypot
    if (formData.get("website")) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Sanitize + validate
    const fullName = sanitize(formData.get("fullName") as string || "")
    const email = sanitize(formData.get("email") as string || "")
    const position = sanitize(formData.get("position") as string || "")
    const portfolio = sanitize(formData.get("portfolio") as string || "")
    const coverLetterText = sanitize(formData.get("coverLetterText") as string || "")

    if (!fullName || !email || !position) {
      return NextResponse.json({ error: "Name, email and position are required." }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    // Validate files
    const resumeFile = formData.get("resume") as File | null
    const coverLetterFile = formData.get("coverLetterFile") as File | null

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    const maxSize = 5 * 1024 * 1024

    if (resumeFile && resumeFile.size > 0) {
      if (!allowedTypes.includes(resumeFile.type)) {
        return NextResponse.json({ error: "Resume must be PDF, DOC, or DOCX." }, { status: 400 })
      }
      if (resumeFile.size > maxSize) {
        return NextResponse.json({ error: "Resume must be under 5MB." }, { status: 400 })
      }
    }

    if (coverLetterFile && coverLetterFile.size > 0) {
      if (!allowedTypes.includes(coverLetterFile.type)) {
        return NextResponse.json({ error: "Cover letter must be PDF, DOC, or DOCX." }, { status: 400 })
      }
      if (coverLetterFile.size > maxSize) {
        return NextResponse.json({ error: "Cover letter must be under 5MB." }, { status: 400 })
      }
    }

    const resumeBuffer = resumeFile && resumeFile.size > 0
      ? Buffer.from(await resumeFile.arrayBuffer())
      : undefined

    const coverLetterBuffer = coverLetterFile && coverLetterFile.size > 0
      ? Buffer.from(await coverLetterFile.arrayBuffer())
      : undefined

    // Log application regardless of email outcome
    console.log(`[APPLICATION] ${new Date().toISOString()} | ${position} | ${fullName} | ${email}`)

    const hrEmail = (process.env.SMTP_HR_USER || "").trim()
    const hrHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e5e5e5">
        <div style="border-bottom:2px solid #F5B513;padding-bottom:16px;margin-bottom:24px">
          <h2 style="color:#F5B513;margin:0">New Job Application</h2>
          <p style="color:#888;margin:4px 0 0">Laneway Careers</p>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;color:#aaa;width:130px;vertical-align:top"><b>Name</b></td><td style="padding:10px 0;color:#e5e5e5">${fullName}</td></tr>
          <tr><td style="padding:10px 0;color:#aaa;vertical-align:top"><b>Email</b></td><td style="padding:10px 0"><a href="mailto:${email}" style="color:#F5B513">${email}</a></td></tr>
          <tr><td style="padding:10px 0;color:#aaa;vertical-align:top"><b>Position</b></td><td style="padding:10px 0;color:#e5e5e5">${position}</td></tr>
          <tr><td style="padding:10px 0;color:#aaa;vertical-align:top"><b>Portfolio</b></td><td style="padding:10px 0;color:#e5e5e5">${portfolio ? `<a href="${portfolio}" style="color:#F5B513">${portfolio}</a>` : "Not provided"}</td></tr>
        </table>
        ${coverLetterText
          ? `<div style="margin-top:20px;padding:16px;background:#111;border-radius:8px;border-left:3px solid #F5B513">
               <h3 style="color:#F5B513;margin:0 0 12px">Cover Letter</h3>
               <p style="color:#ccc;line-height:1.7;margin:0">${coverLetterText.replace(/\n/g, "<br>")}</p>
             </div>`
          : ""}
      </div>
    `

    const confirmHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e5e5e5">
        <div style="border-bottom:2px solid #F5B513;padding-bottom:16px;margin-bottom:24px">
          <h2 style="color:#F5B513;margin:0">Application Received</h2>
          <p style="color:#888;margin:4px 0 0">Laneway Careers</p>
        </div>
        <p style="color:#e5e5e5">Hi <b>${fullName}</b>,</p>
        <p style="color:#ccc;line-height:1.7">Thank you for applying for the <b style="color:#F5B513">${position}</b> role at Laneway. We have received your application and will review it shortly.</p>
        <p style="color:#ccc;line-height:1.7">We appreciate your interest and will be in touch if your profile matches our requirements.</p>
        <p style="color:#888;margin-top:24px">— The Laneway Team</p>
      </div>
    `

    // Send emails — best effort, never block success
    let emailSent = false
    try {
      const transporter = createTransporter()
      await transporter.verify()

      // HR notification (with attachments)
      await transporter.sendMail({
        from: `"Laneway Careers" <${hrEmail}>`,
        to: hrEmail,
        replyTo: email,
        subject: `New Application — ${position} (${fullName})`,
        html: hrHtml,
        attachments: [
          ...(resumeFile && resumeBuffer ? [{ filename: resumeFile.name, content: resumeBuffer }] : []),
          ...(coverLetterFile && coverLetterBuffer ? [{ filename: coverLetterFile.name, content: coverLetterBuffer }] : []),
        ],
      })

      // Confirmation to applicant
      await transporter.sendMail({
        from: `"Laneway Careers" <${hrEmail}>`,
        to: email,
        subject: `Application Received — ${position} at Laneway`,
        html: confirmHtml,
      })

      emailSent = true
    } catch (emailError) {
      // Email failed — log it but don't fail the request
      console.error("[APPLICATION EMAIL FAILED]", emailError)
    }

    return NextResponse.json(
      { message: "Application submitted successfully", emailSent },
      { status: 200 }
    )

  } catch (error) {
    console.error("[APPLICATION ERROR]", error)
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
  }
}

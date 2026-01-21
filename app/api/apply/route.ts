import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const data = await req.formData()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HR_EMAIL,
      pass: process.env.HR_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: process.env.HR_EMAIL,
    to: "hr@laneway.in",
    subject: `New Application - ${data.get("job")}`,
    html: `
      <p><b>Name:</b> ${data.get("name")}</p>
      <p><b>Email:</b> ${data.get("email")}</p>
      <p><b>Job:</b> ${data.get("job")}</p>
      <p><b>Portfolio:</b> ${data.get("portfolio")}</p>
      <p>${data.get("coverLetter")}</p>
    `,
  })

  return NextResponse.json({ success: true })
}

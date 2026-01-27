
import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { Readable } from "stream"
import nodemailer from "nodemailer"
import { rateLimit, getClientIp } from "@/lib/security"
import { get } from "http"

// Simple sanitization to prevent header/content injection
function sanitize(input: string) {
  return input.replace(/[<>"'`\\]/g, "").trim();
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Helper to upload to Cloudinary
// async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
//   // Sanitize filename for Cloudinary public_id
//   const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { 
//         resource_type: "raw", 
//         public_id: sanitizedFilename,
//         type: "upload",
//         flags: "attachment"
//        },
//       (error, result) => {
//         if (error) reject(error)
//         else resolve(result!.secure_url)
//       }
//     )
//     Readable.from(buffer).pipe(stream)
//   })
// }

export async function POST(request: NextRequest) {
  try {
    const ip = await getClientIp();
    if (!rateLimit(ip, Number(process.env.RATE_LIMIT_MAX_REQUESTS))) {
      return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const formData = await request.formData();
    if (formData.get("website")) {
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Sanitize and validate required fields
    const fullName = sanitize(formData.get("fullName") as string || "");
    const email = sanitize(formData.get("email") as string || "");
    const position = sanitize(formData.get("position") as string || "");
    const portfolio = sanitize(formData.get("portfolio") as string || "");
    const coverLetterText = sanitize(formData.get("coverLetterText") as string || "");

    if (!fullName || !email || !position) {
      return new NextResponse(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // Get files
    const resumeFile = formData.get("resume") as File;
    const coverLetterFile = formData.get("coverLetterFile") as File;

    // Validate file types and sizes
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (resumeFile) {
      if (!allowedTypes.includes(resumeFile.type)) {
        return new NextResponse(JSON.stringify({ error: "Invalid resume file type. Only PDF, DOC, and DOCX are allowed." }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }
      if (resumeFile.size > maxSize) {
        return new NextResponse(JSON.stringify({ error: "Resume file size exceeds 5MB limit." }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }
    }
    const resumeBuffer = resumeFile ? Buffer.from(await resumeFile.arrayBuffer()) : undefined;

    if (coverLetterFile) {
      if (!allowedTypes.includes(coverLetterFile.type)) {
        return new NextResponse(JSON.stringify({ error: "Invalid cover letter file type. Only PDF, DOC, and DOCX are allowed." }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }
      if (coverLetterFile.size > maxSize) {
        return new NextResponse(JSON.stringify({ error: "Cover letter file size exceeds 5MB limit." }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }
    }
    const coverLetterBuffer = coverLetterFile ? Buffer.from(await coverLetterFile.arrayBuffer()) : undefined;

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "hostinger",
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_HR_USER,
        pass: process.env.SMTP_HR_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Laneway Careers" <${process.env.SMTP_HR_USER}>`,
      to: process.env.SMTP_HR_USER,
      subject: `New Application - ${position}`,
      html: `
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Position:</b> ${position}</p>
        <p><b>Portfolio:</b> ${portfolio || 'Not provided'}</p>
        <p><b>Cover Letter:</b></p>
        <p>${coverLetterText || 'Not provided'}</p>
      `,
      attachments: [
        ...(resumeFile && resumeBuffer ? [{ filename: resumeFile.name, content: resumeBuffer }] : []),
        ...(coverLetterFile && coverLetterBuffer ? [{ filename: coverLetterFile.name, content: coverLetterBuffer }] : []),
      ],
    });

    // Never return user data in response
    return new NextResponse(JSON.stringify({ message: "Application submitted successfully" }), {
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
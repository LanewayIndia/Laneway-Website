import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { Readable } from "stream"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Helper to upload to Cloudinary
async function uploadToCloudinary(buffer: Buffer, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", public_id: filename },
      (error, result) => {
        if (error) reject(error)
        else resolve(result!.secure_url)
      }
    )
    Readable.from(buffer).pipe(stream)
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const position = formData.get("position") as string
    const portfolio = formData.get("portfolio") as string
    const coverLetterText = formData.get("coverLetterText") as string

    // Validate required fields
    if (!fullName || !email || !position) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get files
    const resumeFile = formData.get("resume") as File | null
    const coverLetterFile = formData.get("coverLetterFile") as File | null

    // Validate file types and sizes
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (resumeFile) {
      if (!allowedTypes.includes(resumeFile.type)) {
        return NextResponse.json({ error: "Invalid resume file type. Only PDF, DOC, and DOCX are allowed." }, { status: 400 })
      }
      if (resumeFile.size > maxSize) {
        return NextResponse.json({ error: "Resume file size exceeds 5MB limit." }, { status: 400 })
      }
    }

    if (coverLetterFile) {
      if (!allowedTypes.includes(coverLetterFile.type)) {
        return NextResponse.json({ error: "Invalid cover letter file type. Only PDF, DOC, and DOCX are allowed." }, { status: 400 })
      }
      if (coverLetterFile.size > maxSize) {
        return NextResponse.json({ error: "Cover letter file size exceeds 5MB limit." }, { status: 400 })
    } 
    }

    // Upload files to Cloudinary
    let resumeUrl = ""
    let coverLetterUrl = ""

    if (resumeFile) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      resumeUrl = await uploadToCloudinary(buffer, `resume_${Date.now()}_${resumeFile.name}`)
    }

    if (coverLetterFile) {
      const buffer = Buffer.from(await coverLetterFile.arrayBuffer())
      coverLetterUrl = await uploadToCloudinary(buffer, `cover_letter_${Date.now()}_${coverLetterFile.name}`)
    }

    // Here, you can integrate with an email service (e.g., SendGrid) or database to store/process the data
    // For example: sendEmail({ fullName, email, position, portfolio, coverLetterText, resumeUrl, coverLetterUrl })

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
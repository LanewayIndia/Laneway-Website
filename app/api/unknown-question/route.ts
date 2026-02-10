import { NextResponse } from "next/server"
import { processLogger, generateRequestId } from "@/lib/logger"

export async function POST(req: Request) {
  const requestId = generateRequestId()

  try {
    // Parse JSON body
    let body: any
    try {
      body = await req.json()
    } catch (parseError) {
      processLogger(
        "unknown-question-parse-error",
        {
          requestId,
          error: "Failed to parse JSON request body",
          endpoint: "/api/unknown-question",
        },
        "warn"
      )
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 }
      )
    }

    // Validate question parameter
    const { question } = body

    if (typeof question !== "string") {
      processLogger(
        "unknown-question-validation-error",
        {
          requestId,
          error: "question parameter is not a string",
          receivedType: typeof question,
          endpoint: "/api/unknown-question",
        },
        "warn"
      )
      return NextResponse.json(
        { success: false, error: "Invalid request: question must be a string" },
        { status: 422 }
      )
    }

    if (question.trim().length === 0) {
      processLogger(
        "unknown-question-validation-error",
        {
          requestId,
          error: "question parameter is empty",
          endpoint: "/api/unknown-question",
        },
        "warn"
      )
      return NextResponse.json(
        { success: false, error: "Invalid request: question cannot be empty" },
        { status: 422 }
      )
    }

    // Log successful processing with metadata only
    processLogger(
      "unknown-question-received",
      {
        requestId,
        questionLength: question.length,
        endpoint: "/api/unknown-question",
      },
      "info"
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    processLogger(
      "unknown-question-unexpected-error",
      {
        requestId,
        error: error instanceof Error ? error.message : "Unknown error",
        endpoint: "/api/unknown-question",
      },
      "error"
    )
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

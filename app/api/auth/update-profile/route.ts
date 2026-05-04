import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const { userId, name, phone } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Use public client - RLS policies will ensure user can only update their own profile
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Get the authorization header from the request
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update profile table with RLS protection
    if (name !== undefined || phone !== undefined) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ name, phone })
        .eq("id", userId)

      if (profileError) {
        console.error("Profile update error:", profileError)
        return NextResponse.json(
          { error: "Failed to update profile" },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

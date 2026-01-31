import { NextResponse } from "next/server"
import type { CookiePreferences } from "@/lib/cookie-consent"
import { isValidPrefs, encodePrefs } from "@/lib/cookie-consent"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!isValidPrefs(body)) {
      return NextResponse.json({ error: "invalid payload" }, { status: 400 })
    }

    const cookieValue = encodePrefs(body as CookiePreferences)

    const cookie = `laneway_consent=${cookieValue}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly; Secure`

    return NextResponse.json({ ok: true }, { status: 200, headers: { "Set-Cookie": cookie } })
  } catch (err) {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 204 })
}

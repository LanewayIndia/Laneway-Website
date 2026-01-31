import { NextRequest, NextResponse } from "next/server"
import { parseConsentCookie } from "@/lib/cookie-consent"

export function proxy(req: NextRequest) {
  const consentCookie = req.cookies.get("laneway_consent")

  if (consentCookie) {
    const prefs = parseConsentCookie(consentCookie.value)
    if (prefs) {
      if (!prefs.analytics && req.nextUrl.pathname.startsWith("/analytics")) {
        return new NextResponse("Analytics disabled by consent", { status: 403 })
      }

      const res = NextResponse.next()
      res.headers.set("x-consent-analytics", String(prefs.analytics))
      return res
    }
    // corrupted/invalid cookie — fallthrough
  }

  return NextResponse.next()
}


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
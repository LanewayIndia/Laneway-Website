import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const consentCookie = req.cookies.get("laneway_consent")

  if (consentCookie) {
    try {
      const prefs = JSON.parse(
        Buffer.from(consentCookie.value, "base64").toString("utf-8")
      )

      // Example: block analytics routes if not allowed
      if (!prefs.analytics && req.nextUrl.pathname.startsWith("/analytics")) {
        return new NextResponse("Analytics disabled by consent", { status: 403 })
      }

      // Example: attach consent info to request headers
      const res = NextResponse.next()
      res.headers.set("x-consent-analytics", String(prefs.analytics))
      return res
    } catch {
      // Corrupted cookie → ignore
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
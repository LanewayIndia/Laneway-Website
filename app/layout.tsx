import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent"
import { Toaster } from "@/components/ui/toaster"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },

  title: "Laneway | Transforming Ideas into Digital Excellence",
  description:
    "We craft innovative digital solutions that empower businesses to thrive in the modern world. AI-powered technology, marketing, consulting, and software development.",
  keywords: ["digital agency", "AI solutions", "software development", "business consulting", "startup incubator", "Laneway", "digital transformation", "technology services", "AI consulting", "marketing solutions"],
  authors: [{ name: "Laneway" }],
  openGraph: {
    title: "Laneway | Transforming Ideas into Digital Excellence",
    url: "https://laneway.in",
    siteName: "Laneway",
    description: "We craft innovative digital solutions that empower businesses to thrive in the modern world.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <CookieConsentBanner />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

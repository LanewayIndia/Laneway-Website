import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent"
import { Toaster } from "@/components/ui/toaster"
import { cookies } from "next/headers"
import { getCookiePreferences } from "@/lib/cookie-consent"
import Script from "next/script"

function AnalyticsWrapper() {
  const prefs = getCookiePreferences()
  if (!prefs?.analytics) return null
  return <Analytics />
}


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const siteUrl = "https://laneway.in"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/favicon.ico" },

  title: "Laneway | Transforming Business with AI Powered Excellence",
  description:
    "We craft innovative digital solutions that empower businesses to thrive in the modern world. AI-powered technology, marketing, consulting, and software development.",
  keywords: [
    "digital agency",
    "AI solutions",
    "software development",
    "business consulting",
    "startup incubator",
    "Laneway",
    "digital transformation",
    "technology services",
    "AI consulting",
    "marketing solutions",
    "business consulting services",
    "business consulting firm",
    "AI business consulting",
    "strategic business consulting",
    "business consulting India",
    "business consulting Bangalore",
    "startup business consulting",
    "technology business consulting",
    "digital business consulting",
    "enterprise business consulting",
    "MSME business consulting",
    "operational business consulting",
    "business transformation consulting",
    "business growth consulting",
    "business strategy consulting",
    "business process consulting",
    "AI-powered business consulting",
    "integrated business consulting",
    "comprehensive business consulting",
    "professional business consulting",
    "expert business consulting",
    "best business consulting",
    "top business consulting",
    "leading business consulting",
    "modern business consulting",
    "innovative business consulting",
    "results-driven business consulting",
    "business consulting solutions"
  ],
  authors: [{ name: "Laneway" }],

  openGraph: {
    title: "Laneway | Transforming Business with AI Powered Excellence",
    description:
      "We craft innovative digital solutions that empower businesses to thrive in the modern world.",
    url: siteUrl,
    siteName: "Laneway",
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Laneway OG Image",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Laneway | Transforming Business with AI Powered Excellence",
    description:
      "We craft innovative digital solutions that empower businesses to thrive in the modern world.",
    images: [`${siteUrl}/public/logo.png`],
  },
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  const consent = cookieStore.get("laneway_consent")

  let analyticsAllowed = false

  if (consent) {
    try {
      const parsed = JSON.parse(
        Buffer.from(consent.value, "base64").toString("utf-8")
      )
      analyticsAllowed = parsed.analytics === true
    } catch {
      analyticsAllowed = false
    }
  }
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
      <meta name="google-site-verification" content="WI9WFVW2gRBSwUqPhXqV8zjDvrVHQ5tDes9kF_28TkQ" />
        {GA_ID && (
          <>
             {/* Google tag (gtag.js)  */}
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}>
              {
                `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', "${GA_ID}")`
              }
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <CookieConsentBanner />
        <Toaster />
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
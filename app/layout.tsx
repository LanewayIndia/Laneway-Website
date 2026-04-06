import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent"
import { Toaster } from "@/components/ui/toaster"
import { cookies } from "next/headers"
import Script from "next/script"

// FIX: Removed AnalyticsWrapper that called getCookiePreferences() (uses localStorage) on server — now conditionally render Analytics based on cookie consent from server cookie


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
  icons: { icon: "/logo.svg", apple: "/logo.png" },
  manifest: "/manifest.json", // FIX: Added PWA manifest

  title: "Laneway | Transforming Business with AI Powered Excellence",
  description:
    "Laneway is a next-generation AI-powered business consulting firm that drives growth by integrating consulting, technology, and media services. It leverages innovative digital solutions and artificial intelligence to help businesses adapt and thrive in the modern economy. By combining strategic insight with cutting-edge tools, Laneway empowers organizations to optimize operations, enhance marketing efforts, and scale effectively",
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
      "Laneway is a next-generation AI-powered business consulting firm that drives growth by integrating consulting, technology, and media services. It leverages innovative digital solutions and artificial intelligence to help businesses adapt and thrive in the modern economy. By combining strategic insight with cutting-edge tools, Laneway empowers organizations to optimize operations, enhance marketing efforts, and scale effectively",
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
      "Laneway is a next-generation AI-powered business consulting firm that drives growth by integrating consulting, technology, and media services. It leverages innovative digital solutions and artificial intelligence to help businesses adapt and thrive in the modern economy. By combining strategic insight with cutting-edge tools, Laneway empowers organizations to optimize operations, enhance marketing efforts, and scale effectively",
    images: [`${siteUrl}/logo.png`], // FIX: Removed incorrect /public/ prefix — Next.js serves public files from root
  },

  // FIX: Added robots meta tag for SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

        {/* FIX: Security headers via meta tags */}
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* FIX: Preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* FIX: GA script loading — separated loader and config scripts */}
        {GA_ID && analyticsAllowed && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}

        {/* FIX: JSON-LD Organization Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Laneway India Enterprises Private Limited",
              url: siteUrl,
              logo: `${siteUrl}/Laneway-Logo.png`,
              description:
                "AI-powered business consulting firm offering strategic consulting, technology solutions, marketing, software development, and startup incubation.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9961348942",
                contactType: "customer service",
                availableLanguage: "English",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "1087 B, Sankranthi, Perumbaikkad",
                addressLocality: "Kottayam",
                addressRegion: "Kerala",
                postalCode: "686016",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.instagram.com/lanewayindia",
                "https://x.com/lanewayindia",
                "https://www.linkedin.com/company/laneway-india/",
              ],
            }),
          }}
        />

        {/* FIX: JSON-LD WebSite Schema for homepage search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Laneway",
              url: siteUrl,
            }),
          }}
        />

        {/* FIX: JSON-LD LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Laneway India Enterprises Private Limited",
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "1087 B, Sankranthi, Perumbaikkad",
                  addressLocality: "Kottayam",
                  addressRegion: "Kerala",
                  postalCode: "686016",
                  addressCountry: "IN",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "Koramangala 8th Block",
                  addressLocality: "Bangalore",
                  addressRegion: "Karnataka",
                  postalCode: "560095",
                  addressCountry: "IN",
                },
              ],
              telephone: "+91-9961348942",
              email: "info@laneway.in",
              url: siteUrl,
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {/* FIX: Skip-to-content link for accessibility (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-gold focus:text-background focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
        <CookieConsentBanner />
        <Toaster />
        {/* FIX: Conditionally render Analytics based on server-side cookie check instead of crashed AnalyticsWrapper */}
        {analyticsAllowed && <Analytics />}
      </body>
    </html>
  )
}
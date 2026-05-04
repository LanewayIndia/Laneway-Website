import type { Metadata } from "next"
import ContactPageClient from "./contact-client"

// FIX: Moved metadata to server-side layout wrapper — client components cannot export metadata
export const metadata: Metadata = {
  title: "Contact Us | Laneway — Get a Free Business Consultation",
  description:
    "Get in touch with Laneway for a free business consultation. Our AI-powered consulting team helps startups, SMEs, and enterprises transform and grow.",
  openGraph: {
    title: "Contact Us | Laneway — Get a Free Business Consultation",
    description:
      "Get in touch with Laneway for a free business consultation. Our AI-powered consulting team helps startups, SMEs, and enterprises transform and grow.",
    url: "https://laneway.in/contact",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}

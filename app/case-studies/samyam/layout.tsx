import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SAMYAM: Designing a Digital Sanctuary | Laneway",
  description: "Samyam needed a website that translated its spiritual-luxury philosophy visually and emotionally.",
  openGraph: {
    title: "SAMYAM: Designing a Digital Sanctuary | Laneway",
    description: "Samyam needed a website that translated its spiritual-luxury philosophy visually and emotionally.",
    images: [{ url: "/Samyam.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMYAM: Designing a Digital Sanctuary | Laneway",
    description: "Samyam needed a website that translated its spiritual-luxury philosophy visually and emotionally.",
    images: ["/Samyam.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

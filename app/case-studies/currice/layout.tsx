import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Currice Foods: Building the Founder. Building the Brand. | Laneway",
  description: "How Laneway is helping Currice Foods grow through founder-led marketing across Instagram, LinkedIn, and Reddit.",
  openGraph: {
    title: "Currice Foods: Building the Founder. Building the Brand. | Laneway",
    description: "How Laneway is helping Currice Foods grow through founder-led marketing across Instagram, LinkedIn, and Reddit.",
    images: [{ url: "/currice.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currice Foods: Building the Founder. Building the Brand. | Laneway",
    description: "How Laneway is helping Currice Foods grow through founder-led marketing across Instagram, LinkedIn, and Reddit.",
    images: ["/currice.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

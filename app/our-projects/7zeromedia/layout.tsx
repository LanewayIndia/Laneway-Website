import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "7ZeroMedia Case Study | Laneway",
  description: "Case Study Will Be Released Soon. This premium educational content is currently in production.",
  openGraph: {
    title: "7ZeroMedia Case Study | Laneway",
    description: "Case Study Will Be Released Soon. This premium educational content is currently in production.",
    images: [{ url: "/7zeromedia.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "7ZeroMedia Case Study | Laneway",
    description: "Case Study Will Be Released Soon. This premium educational content is currently in production.",
    images: ["/7zeromedia.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

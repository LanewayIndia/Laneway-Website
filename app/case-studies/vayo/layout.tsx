import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VAYO: Building a Social Community Brand | Laneway",
  description: "Vayo creates a comfortable, activity driven space where individuals meet new people, share experiences and build real connections.",
  openGraph: {
    title: "VAYO: Building a Social Community Brand | Laneway",
    description: "Vayo creates a comfortable, activity driven space where individuals meet new people, share experiences and build real connections.",
    images: [{ url: "/Vayo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VAYO: Building a Social Community Brand | Laneway",
    description: "Vayo creates a comfortable, activity driven space where individuals meet new people, share experiences and build real connections.",
    images: ["/Vayo.png"],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import { ComingSoonTemplate } from "@/components/blogs/coming-soon-template"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Startup Funding Masterclass | Laneway",
  description: "Gain critical insights and strategies to secure seed and Series A funding in today's competitive startup ecosystem.",
}

export default function StartupFundingPage() {
  return (
    <ComingSoonTemplate
      title="Startup Funding Masterclass"
      category="Startup & Investment"
    />
  )
}

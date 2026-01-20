import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogsHero } from "@/components/blogs/blogs-hero"
import { BlogsGrid } from "@/components/blogs/blogs-grid"
import { CampaignsSection } from "@/components/blogs/campaigns-section"
import { AnalyticsSection } from "@/components/blogs/analytics-section"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "Blogs & Analytics | Laneway",
  description: "Insights, campaigns, research, and analytics from the Laneway team.",
}

export default function BlogsPage() {
  return (
    <>
      <Header />
      <main>
        <BlogsHero />
        <CampaignsSection />
        <AnalyticsSection />
        <BlogsGrid />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

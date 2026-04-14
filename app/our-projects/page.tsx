import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CaseStudiesHero } from "@/components/our-projects/case-studies-hero"
import { CaseStudiesList } from "@/components/our-projects/case-studies-list"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "Case Studies | Laneway",
  description: "Explore our successful projects and see how we have helped businesses transform and grow.",
}

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <CaseStudiesHero />
        <CaseStudiesList />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

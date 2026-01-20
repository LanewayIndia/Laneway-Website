import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesList } from "@/components/services/services-list"
import { ServicesCTA } from "@/components/services/services-cta"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "Services | Laneway",
  description:
    "Comprehensive digital solutions including AI technology, marketing, consulting, software development, and startup incubation.",
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesList />
        <ServicesCTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersHero } from "@/components/careers/careers-hero"
import { CultureSection } from "@/components/careers/culture-section"
import { JobsList } from "@/components/careers/jobs-list"
import { CareersCTA } from "@/components/careers/careers-cta"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "Careers | Laneway",
  description: "Join our team of innovators and help shape the future of digital business.",
}

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <CareersHero />
        <CultureSection />
        <JobsList />
        <CareersCTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

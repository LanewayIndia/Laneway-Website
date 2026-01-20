import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { MissionSection } from "@/components/about/mission-section"
import { StorySection } from "@/components/about/story-section"
import { PrinciplesSection } from "@/components/about/principles-section"
import { VisionSection } from "@/components/about/vision-section"
import { Chatbot } from "@/components/chatbot"

export const metadata: Metadata = {
  title: "About Us | Laneway",
  description: "Learn about our mission, story, principles, and vision for the future of digital business.",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <MissionSection />
        <StorySection />
        <PrinciplesSection />
        <VisionSection />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

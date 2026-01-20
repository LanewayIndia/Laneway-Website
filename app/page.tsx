import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { HeroSection } from "@/components/home/hero-section"
import { AboutSnapshot } from "@/components/home/about-snapshot"
import { WhyLaneway } from "@/components/home/why-laneway"
import { PartnersSection } from "@/components/home/partners-section"
import { ServicesOverview } from "@/components/home/services-overview"
import { BlogsPreview } from "@/components/home/blogs-preview"
import { ContactSection } from "@/components/home/contact-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSnapshot />
        <WhyLaneway />
        <PartnersSection />
        <ServicesOverview />
        <BlogsPreview />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { HowWeOperate } from "@/components/contact/how-we-operate"

// FIX: Extracted client component so parent page.tsx can export metadata for SEO
export default function ContactPageClient() {
    return (
        <>
            <Header />
            <main id="main-content">
                <HowWeOperate />
                <ContactHero />
                <ContactForm />
            </main>
            <Footer />
            <Chatbot />
        </>
    )
}

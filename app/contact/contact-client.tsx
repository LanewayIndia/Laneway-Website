"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"

// FIX: Extracted client component so parent page.tsx can export metadata for SEO
export default function ContactPageClient() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await supabase.auth.getSession()

                if (!data?.session?.user) {
                    // User not logged in, redirect to auth
                    router.push("/auth")
                } else {
                    // User is logged in
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error("Auth check error:", error)
                router.push("/auth")
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-pumice">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <>
            <Header />
            <main id="main-content">
                <ContactHero />
                <ContactForm />
            </main>
            <Footer />
            <Chatbot />
        </>
    )
}

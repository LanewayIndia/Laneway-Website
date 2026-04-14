"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"


const words = ["BUILD", "TRANSFORM", "SCALE",]

export function HeroSection() {

  const [index, setIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2000) // change word every 2 sec
    return () => clearInterval(interval)
  }, [])

  return (
    // FIX: Added id for skip-to-content link
    <section id="main-content" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 noise-texture" aria-hidden="true" />

      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-75 sm:w-125 lg:w-200 h-50 sm:h-75 lg:h-112.5 bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,85,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,85,0.02)_1px,transparent_1px)] bg-size-[40px_40px] sm:bg-size-[60px_60px] lg:bg-size-[80px_80px]" />

      <div className="relative z-10 container py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="text-center">
          {/* 1 Year Anniversary Scrolling Banner - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-screen relative left-1/2 -translate-x-1/2 mb-8 sm:mb-12 border-y border-gold/30 bg-[#050505]/60 backdrop-blur-md py-2.5 sm:py-3.5 shadow-[0_0_30px_rgba(245,181,19,0.1)] overflow-hidden"
          >
            {/* Left/Right Fade Mask for edge softness */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 border-none bg-linear-to-r from-[#050505] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 border-none bg-linear-to-l from-[#050505] to-transparent z-10" />

            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 30, // Adjusted duration for full width
              }}
              className="flex w-fit whitespace-nowrap"
            >
              {[...Array(16)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-[#F5B513] via-[#ffffff] to-[#F5B513] uppercase px-5 sm:px-8 drop-shadow-[0_0_8px_rgba(245,181,19,0.5)]">
                    CELEBRATING 1 YEAR ANNIVERSARY
                  </span>
                  <span className="text-[24px] sm:text-xl text-[#F5B513] font-extrabold">•</span>
                  <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-[#F5B513] via-[#ffffff] to-[#F5B513] uppercase px-5 sm:px-8 drop-shadow-[0_0_8px_rgba(245,181,19,0.5)]">
                    LANEWAY
                  </span>
                  <span className="text-[24px] sm:text-xl text-[#F5B513] font-extrabold">•</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <span className="text-xs sm:text-sm tracking-premium uppercase text-pumice">Business Excellence Redefined</span>
          </motion.div>
          <div className="relative flex items-center justify-center h-9 sm:h-12 md:h-14 lg:h-18 mx-auto mb-4 sm:mb-6 md:mb-8 w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={words[index]}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-snow leading-tight whitespace-nowrap"
              >
                {words[index]}
              </motion.h1>
            </AnimatePresence>
          </div>
          {/* FIX: Changed from h1 to h2 — only one h1 per page for SEO */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-gradient text-balance"
          >
            Business with AI-Powered Excellence
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg lg:text-lg text-pumice max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14 leading-relaxed font-light px-2"
          >
            Your success is our priority - we don't just meet expectations, we exceed them. Together, let's turn your vision into reality
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            {/* FIX: Added data-cta tracking attributes */}
            <Link
              href="/case-studies"
              data-cta="explore-masterpieces"
              data-section="hero"
              data-position="above-fold"
              className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 h-11 sm:h-14 text-xs sm:text-base font-medium text-background bg-snow rounded-full transition-all duration-300 hover:bg-gold whitespace-nowrap w-full sm:w-auto"
            >
              <span>Explore Our Masterpieces</span>
              <ArrowRight size={16} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>

            {/* FIX: Added data-cta tracking attributes */}
            <button
              onClick={async () => {
                try {
                  const { data } = await supabase.auth.getSession()
                  if (data?.session?.user) router.push("/laneway-open-house")
                  else router.push("/auth")
                } catch (err) {
                  router.push("/auth")
                }
              }}
              data-cta="begin-transformation"
              data-section="hero"
              data-position="above-fold"
              className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 h-11 sm:h-14 text-xs sm:text-base font-medium text-snow border border-glass-border rounded-full transition-all duration-300 hover:border-gold/50 hover:bg-gold/5 whitespace-nowrap w-full sm:w-auto"
            >
              <span>Start Your Free Trial</span>
              <ArrowRight size={16} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              {/* <span className="hidden sm:inline-block transition-transform duration-300 group-hover:scale-125">→</span> */}
            </button>
          </motion.div>
        </div>
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <span className="text-xs tracking-premium uppercase text-pumice">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 sm:h-12 bg-linear-to-b from-gold/50 to-transparent"
          />
        </div>
      </motion.div> */}
    </section >
  )
}

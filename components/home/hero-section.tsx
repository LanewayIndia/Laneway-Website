"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const words = ["BUILD", "TRANSFORM", "SCALE",]

export function HeroSection() {

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2000) // change word every 2 sec
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 noise-texture" aria-hidden="true" />

      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,85,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,85,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] lg:bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <span className="text-xs sm:text-sm tracking-premium uppercase text-pumice">Digital Excellence Redefined</span>
          </motion.div>
          <div className="relative flex items-center justify-center h-[40px] sm:h-[50px] md:h-[60px] lg:h-[75px] mx-auto mb-4 sm:mb-6 md:mb-8 w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={words[index]}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-snow leading-tight whitespace-nowrap"
              >
                {words[index]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-gradient text-balance"
          >
            Business with AI-Powered Excellence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-pumice max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14 leading-relaxed font-light px-2"
          >
            Your success is our priority - we don't just meet expectations, we exceed them. Together, let's turn your vision into reality
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2"
          >
            <Link
              href="/case-studies"
              className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-background bg-snow rounded-full transition-all duration-300 hover:bg-gold whitespace-nowrap"
            >
              <span>Explore Our Masterpieces</span>
              <ArrowRight size={14} className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-snow border border-glass-border rounded-full transition-all duration-300 hover:border-gold/50 hover:bg-gold/5 whitespace-nowrap"
            >
              <span>Begin Your Transformation</span>
              <span className="hidden sm:inline">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
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
            className="w-px h-8 sm:h-12 bg-gradient-to-b from-gold/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}

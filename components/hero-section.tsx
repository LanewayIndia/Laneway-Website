"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 noise-texture" />

      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,85,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,85,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-xs tracking-premium uppercase text-pumice">Digital Excellence Redefined</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-snow leading-[1.1] mb-8 text-balance"
          >
            Transforming Ideas
            <br />
            <span className="text-gradient">Into Reality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-pumice max-w-xl mx-auto mb-12 leading-relaxed font-light"
          >
            We craft innovative digital solutions that empower businesses to thrive in the modern world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/case-studies"
              className="group flex items-center gap-3 px-8 py-4 text-sm font-medium text-background bg-snow rounded-full transition-all duration-300 hover:bg-gold"
            >
              <span>Explore Our Work</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-3 px-8 py-4 text-sm font-medium text-snow border border-glass-border rounded-full transition-all duration-300 hover:border-gold/50 hover:bg-gold/5"
            >
              <span>Get In Touch</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs tracking-premium uppercase text-pumice">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}

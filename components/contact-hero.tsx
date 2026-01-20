"use client"

import { motion } from "framer-motion"

export function ContactHero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 noise-texture" />

      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-xs tracking-premium uppercase text-pumice">Begin Your Transformation</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-snow mb-8 text-balance leading-[1.1]">
            {`Let's Start a`}
            <br />
            <span className="text-gradient">Conversation</span>
          </h1>

          <p className="text-lg sm:text-xl text-pumice max-w-2xl mx-auto text-pretty font-light leading-relaxed">
            Ready to transform your business? Our team is here to help you navigate your digital journey.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

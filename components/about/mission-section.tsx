"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Target } from "lucide-react"

export function MissionSection() {
  return (
    <section className="py-32 relative">
      {/* Ambient background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-105 h-105 bg-gold/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                <Target size={22} className="text-gold" strokeWidth={1.5} />
              </div>
              <span className="text-xs tracking-premium uppercase text-pumice">
                Our Mission
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-snow mb-8 text-balance">
              Empowering Businesses Through Innovation
            </h2>

            <p className="text-pumice text-lg leading-relaxed font-light">
              At Laneway, we help businesses evolve through intelligence, creativity,
              and innovation. We are a consulting and technology solutions company
              that transforms ideas into measurable growth.
              <br />
              <br />
              Our mission is simple: to bridge the gap between traditional business
              models and modern, AI-driven innovation.
            </p>
          </motion.div>

          {/* RIGHT — IMAGE ONLY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-4/3 sm:aspect-square glass-card rounded-2xl overflow-hidden">
              {/* Optional subtle overlay for brand consistency */}
              <div className="absolute inset-0 bg-linear-to-br from-black/30 via-transparent to-black/40 z-10"  />

              <Image
                src="/mission.png"
                alt="Empowering Businesses Through Innovation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

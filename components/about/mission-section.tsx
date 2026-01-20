"use client"

import { motion } from "framer-motion"
import { Target } from "lucide-react"

export function MissionSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              <span className="text-xs tracking-premium uppercase text-pumice">Our Mission</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-snow mb-8 text-balance">
              Empowering Businesses Through Innovation
            </h2>

            <p className="text-pumice text-lg leading-relaxed font-light">
              Our mission is to empower businesses of all sizes to harness the transformative power of technology. We
              believe that every organization deserves access to world-class digital solutions that drive growth,
              efficiency, and competitive advantage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-square glass-card rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold-light/5" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,85,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,85,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Target size={140} className="text-gold/10" strokeWidth={0.5} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

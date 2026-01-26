"use client"

import { motion } from "framer-motion"

const partners = ["LanewayLabs", "7ZeroMedia", "VAYO", "SAMYAM"]

export function PartnersSection() {
  return (
    <section className="py-50 border-y border-glass-border overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-gold/2 to-transparent" />

      <div className="text-center relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-gold/30" />
          <span className="text-xs tracking-premium uppercase text-pumice">Trusted By</span>
          <div className="w-12 h-px bg-gold/30" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">Trusted By</span> */}
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow">Our Partners</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex gap-8"
          >
            {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-12 px-6 sm:h-16 sm:px-10 glass-card rounded-full transition-all duration-500 hover:border-gold/20"
              >
                <span className="font-heading text-lg font-medium text-pumice whitespace-nowrap tracking-wide">
                  {partner}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

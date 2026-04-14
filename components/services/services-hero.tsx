"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const categoryNav = [
  { number: "01", label: "Business Consulting", href: "#business-consulting" },
  { number: "02", label: "AI & Tech Services", href: "#ai-tech-services" },
  { number: "03", label: "Media & Marketing", href: "#media-marketing-category" },
]

export function ServicesHero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 noise-texture" />

      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-gold/5 rounded-full blur-[120px]" />
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
            <span className="text-xs tracking-premium uppercase text-pumice">Our Services</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-snow mb-8 text-balance leading-[1.1]">
            Comprehensive
            <br />
            <span className="text-gradient">Digital Solutions</span>
          </h1>

          <p className="text-lg sm:text-xl text-pumice max-w-2xl mx-auto text-pretty font-light leading-relaxed mb-12">
            From AI-powered technology to strategic consulting, we offer a full spectrum of services designed to
            transform your business.
          </p>

          {/* Category quick-nav */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categoryNav.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-glass-border text-sm text-pumice hover:border-gold/40 hover:text-snow transition-all duration-300"
              >
                <span className="text-[10px] font-mono text-gold/60 group-hover:text-gold/90 transition-colors duration-300">
                  {cat.number}
                </span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

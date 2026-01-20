"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function AboutSnapshot() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60])

  return (
    <section ref={sectionRef} className="py-40 overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/3 rounded-full blur-[100px]" />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-xs tracking-premium uppercase text-pumice">Who We Are</span>
            <div className="w-12 h-px bg-gold/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-snow mb-10 tracking-tight"
          >
            Laneway
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-xl text-pumice max-w-(--container-width) mx-auto leading-relaxed font-light"
          >
           Laneway is a next-generation consulting firm that drives business growth through strategy, technology, and media solutions. Founded and led by modern innovators, we partner with businesses to solve today's challenges and build lasting, sustainable value.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Video } from "lucide-react"

interface ComingSoonProps {
  title: string
  category: string
}

export function ComingSoonTemplate({ title, category }: ComingSoonProps) {
  return (
    <section className="pt-36 pb-28 text-center">
      <div className="mx-auto max-w-4xl px-6">

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs tracking-premium uppercase text-gold block mb-4"
        >
          {category}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-snow mb-10"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-16 glow-gold-sm"
        >
          <Video size={60} className="mx-auto text-gold mb-6" />

          <h2 className="text-2xl font-semibold text-snow mb-4">
            Video Will Be Released Soon
          </h2>

          <p className="text-pumice text-lg leading-relaxed max-w-xl mx-auto">
            This premium educational content is currently in production.  
            Stay tuned — we are preparing a high-quality masterclass designed to deliver real-world value and actionable insights.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

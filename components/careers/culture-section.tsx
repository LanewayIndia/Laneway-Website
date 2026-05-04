"use client"

import { motion } from "framer-motion"
import { Sparkles, Heart, Zap, Users } from "lucide-react"

const values = [
  {
    icon: Sparkles,
    title: "Innovation First",
    description: "We embrace new ideas and technologies, always pushing boundaries.",
  },
  {
    icon: Heart,
    title: "People Matter",
    description: "Our team is our greatest asset. We invest in growth and well-being.",
  },
  {
    icon: Zap,
    title: "Move Fast",
    description: "We ship quickly, iterate often, and learn from every experience.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Great things happen when diverse minds work together.",
  },
]

export function CultureSection() {
  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-4">Our Culture</h2>
          <p className="text-pumice text-lg max-w-2xl mx-auto">
            {`We've built a culture where creativity thrives and every voice matters.`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background border border-border rounded-2xl p-6 text-center hover:border-gold/50 transition-colors"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <value.icon size={28} className="text-gold" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-snow mb-2">{value.title}</h3>
              <p className="text-pumice text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Award, Eye, Handshake, Lightbulb, Shield, Zap } from "lucide-react"

const principles = [
  { icon: Lightbulb, title: "Innovation", description: "We constantly push boundaries and embrace new ideas." },
  { icon: Award, title: "Excellence", description: "We deliver nothing less than exceptional quality." },
  { icon: Shield, title: "Integrity", description: "We operate with honesty and transparency." },
  { icon: Handshake, title: "Partnership", description: "We build lasting relationships with our clients." },
  { icon: Eye, title: "Transparency", description: "We communicate openly and honestly." },
  { icon: Zap, title: "Agility", description: "We adapt quickly to changing needs." },
]

export function PrinciplesSection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">Our Values</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-snow mb-6 text-balance">
            Principles We Live By
          </h2>
          <p className="text-pumice text-lg max-w-xl mx-auto font-light">
            These core principles guide every decision we make.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="glass-card rounded-xl p-8 h-full transition-all duration-500 hover:border-gold/20">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/15 transition-colors duration-500">
                  <principle.icon size={22} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-medium text-snow mb-3 group-hover:text-gold transition-colors duration-300">
                  {principle.title}
                </h3>
                <p className="text-pumice text-sm leading-relaxed">{principle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

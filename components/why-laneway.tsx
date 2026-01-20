"use client"

import { motion } from "framer-motion"
import { Lightbulb, Rocket, Shield, Users } from "lucide-react"

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Cutting-edge AI and technology solutions that keep you ahead.",
  },
  {
    icon: Rocket,
    title: "Results",
    description: "Measurable outcomes that directly impact business growth.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Lasting partnerships built on transparency and integrity.",
  },
  {
    icon: Users,
    title: "Expertise",
    description: "Deep knowledge across industries and technologies.",
  },
]

export function WhyLaneway() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">Why Choose Us</span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-snow text-balance">
            Why Laneway?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-8 h-full glass-card rounded-2xl transition-all duration-500 hover:border-gold/20">
                {/* Glass highlight overlay */}
                <div className="absolute inset-0 rounded-2xl glass-card-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center mb-6 rounded-full bg-gold/10 group-hover:bg-gold/15 transition-colors duration-500">
                    <value.icon size={22} className="text-gold" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-heading text-2xl font-medium text-snow mb-3 group-hover:text-gold transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-pumice text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

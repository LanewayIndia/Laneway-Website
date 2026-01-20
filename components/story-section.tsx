"use client"

import { motion } from "framer-motion"

const milestones = [
  { year: "2020", event: "Founded with a vision to democratize digital innovation" },
  { year: "2021", event: "Launched AI-powered consulting services" },
  { year: "2022", event: "Expanded to serve 50+ businesses globally" },
  { year: "2023", event: "Launched startup incubator program" },
  { year: "2024", event: "Reached 100+ successful projects milestone" },
  { year: "2025", event: "Continued innovation in AI and technology solutions" },
]

export function StorySection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">Our Journey</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-snow mb-6 text-balance">Our Story</h2>
          <p className="text-pumice text-lg max-w-2xl mx-auto font-light">
            From a small team with big dreams to a leading digital agency, our journey has been defined by innovation
            and commitment.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-glass-border hidden md:block" />

          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass-card rounded-xl p-6 inline-block transition-all duration-500 hover:border-gold/20">
                    <span className="text-gold font-heading text-3xl font-medium">{milestone.year}</span>
                    <p className="text-pumice mt-3 text-sm">{milestone.event}</p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-3 h-3 bg-gold rounded-full ring-4 ring-background" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

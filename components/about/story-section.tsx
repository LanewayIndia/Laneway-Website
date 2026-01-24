"use client"

import { motion } from "framer-motion"

const milestones = [
  { year: "The Beginning", event: "The journey of Laneway began with a simple goal — to help others and provide meaningful services that make a difference." },
  { year: "The Spark", event: "What started as a small initiative soon grew into a passion project driven by enthusiasm, curiosity, creativity, and the desire to build something lasting." },
  { year: "The Mission", event: "We aim to help businesses grow and scale by providing the right kind of consulting at the right stage in every business journey." },
  { year: "Lessons Learned", event: "Every small win and failure has taught us how to navigate the complex and challenging business world with resilience and clarity." },
  { year: "Our Commitment", event: "We continue to empower founders, startups, and enterprises with strategic guidance, innovation, and technology-driven solutions." },
  { year: "The Future", event: "We are eager to share our story with the world. Join us as we continue building meaningful impact and shaping the future." },
]

export function StorySection() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-gold/3 rounded-full blur-[120px]" />
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

          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-snow mb-6 text-balance">
            Our Story
          </h2>

          <p className="text-pumice text-lg max-w-3xl mx-auto font-light leading-relaxed">
            The journey of Laneway began with a simple goal — to help others and provide meaningful services that make a difference.
            What started as a small initiative soon evolved into a passion-driven mission to create lasting impact.
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
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass-card rounded-xl p-6 inline-block transition-all duration-500 hover:border-gold/20">
                    <span className="text-gold font-heading text-2xl font-medium">
                      {milestone.year}
                    </span>
                    <p className="text-pumice mt-3 text-sm leading-relaxed">
                      {milestone.event}
                    </p>
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

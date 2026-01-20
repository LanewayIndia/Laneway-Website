"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const caseStudies = [
  {
    id: "vayo",
    name: "VAYO",
    tagline: "Revolutionizing Transportation Logistics",
    problem:
      "VAYO needed a scalable platform to manage their growing fleet operations and optimize delivery routes across multiple regions.",
    solution:
      "We developed a comprehensive AI-powered logistics platform with real-time tracking, route optimization, and predictive maintenance capabilities.",
    techStack: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Redis", "AWS"],
    results: [
      "45% reduction in delivery times",
      "30% decrease in operational costs",
      "99.9% uptime reliability",
      "2x fleet efficiency improvement",
    ],
    href: "/case-studies/vayo",
  },
  {
    id: "samyam",
    name: "Samyam",
    tagline: "Transforming Healthcare Accessibility",
    problem:
      "Samyam required a telemedicine platform to connect patients with healthcare providers, especially in underserved areas.",
    solution:
      "We created a HIPAA-compliant telemedicine platform with video consultations, prescription management, and health record integration.",
    techStack: ["React Native", "Node.js", "WebRTC", "MongoDB", "Twilio", "Azure"],
    results: [
      "100,000+ patients served",
      "85% patient satisfaction rate",
      "3x increase in doctor reach",
      "40% reduction in wait times",
    ],
    href: "/case-studies/samyam",
  },
]

export function CaseStudiesList() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Visual */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-gold-light/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="font-heading text-6xl font-bold text-gold/30">{study.name}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block">{study.name}</span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-4">{study.tagline}</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-snow font-semibold mb-2">The Challenge</h3>
                    <p className="text-pumice leading-relaxed">{study.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-snow font-semibold mb-2">Our Solution</h3>
                    <p className="text-pumice leading-relaxed">{study.solution}</p>
                  </div>

                  <div>
                    <h3 className="text-snow font-semibold mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {study.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-sm text-gold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-snow font-semibold mb-3">Results</h3>
                    <ul className="space-y-2">
                      {study.results.map((result) => (
                        <li key={result} className="flex items-center gap-3">
                          <CheckCircle size={18} className="text-gold shrink-0" />
                          <span className="text-pumice">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    asChild
                    className="bg-gold hover:bg-gold-light text-background font-semibold px-6 py-3 rounded-full group mt-4"
                  >
                    <Link href={study.href}>
                      Read Full Case Study
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

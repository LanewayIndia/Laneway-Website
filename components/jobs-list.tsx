"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Clock, ArrowRight } from "lucide-react"

const jobs = [
  {
    title: "Senior AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    href: "/careers/senior-ai-engineer",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    href: "/careers/product-designer",
  },
  {
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    href: "/careers/full-stack-developer",
  },
  {
    title: "Business Development Manager",
    department: "Business",
    location: "Hybrid",
    type: "Full-time",
    href: "/careers/bd-manager",
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    href: "/careers/marketing-specialist",
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    href: "/careers/devops-engineer",
  },
]

export function JobsList() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-snow mb-4">Open Positions</h2>
          <p className="text-pumice text-lg max-w-2xl">
            Find your perfect role and become part of something extraordinary.
          </p>
        </motion.div>

        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={job.href} className="group block">
                <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-snow mb-2 group-hover:text-gold transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-pumice">
                        <span className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold">
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-pumice group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

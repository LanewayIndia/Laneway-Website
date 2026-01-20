"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function ServicesCTA() {
  return (
    <section className="py-40 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-gold/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-snow mb-6 text-balance">
            Ready to Start
            <br />
            Your Project?
          </h2>
          <p className="text-lg text-pumice max-w-xl mx-auto mb-12 font-light">
            {`Let's discuss how our services can help you achieve your business goals.`}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium text-background bg-snow rounded-full transition-all duration-300 hover:bg-gold"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

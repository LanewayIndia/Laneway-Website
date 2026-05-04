"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Telescope } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VisionSection() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Telescope size={40} className="text-gold" />
          </div>

          <span className="text-gold font-medium tracking-wider uppercase text-sm mb-4 block">Our Vision</span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-snow mb-6 max-w-4xl mx-auto text-balance">
            To Be the Catalyst for Global Digital Transformation
          </h2>
          <p className="text-pumice text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            We envision a world where every business, regardless of size or location, has access to transformative
            digital solutions. Our goal is to be the trusted partner that helps organizations navigate the complexities
            of the digital age and emerge stronger, more efficient, and more competitive.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gold hover:bg-gold-light text-background font-semibold px-10 py-6 rounded-full text-lg group"
          >
            <Link href="/contact">
              Start Your Journey
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

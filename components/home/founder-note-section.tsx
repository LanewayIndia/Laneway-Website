"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function FounderNoteSection() {
  return (
    <section className="relative py-4 sm:py-6 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-row items-center gap-5 sm:gap-8"
        >
          {/* Founder Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden">
              <Image
                src="/gokul-m-prabhu.jpg"
                alt="Gokul M Prabhu, Founder of Laneway"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Founder Note */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs tracking-premium uppercase text-gold mb-1"
            >
              A note from our Founder,
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl font-bold text-snow mb-2"
            >
              Gokul M Prabhu
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/founder-note"
                className="inline-flex items-center gap-1.5 text-pumice hover:text-gold transition-colors duration-200 text-xs sm:text-sm font-medium"
              >
                Read more
                <svg
                  className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

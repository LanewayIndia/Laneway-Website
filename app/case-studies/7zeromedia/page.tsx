"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function SevenZeroMediaCaseStudy() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-28">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative text-center"
        >
          <div className="absolute -inset-10 bg-linear-to-br from-gold/20 to-transparent blur-3xl" />

          <Image
            src="/7ZeroMedia.png"
            alt="7ZeroMedia logo"
            width={180}
            height={180}
            className="mx-auto mb-8 object-contain"
            priority
          />

          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Case Study by Laneway
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-snow mt-6">
            Case Study Will Be Released Soon
          </h1>

          <p className="text-pumice leading-relaxed mt-6 max-w-3xl mx-auto">
            This premium educational content is currently in production. Stay tuned —
            we are preparing a high-quality masterclass designed to deliver real-world
            value and actionable insights.
          </p>
        </motion.div>

        {/* PLACEHOLDER SECTION */}
        {/* PLACEHOLDER SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >

          {/* Coming Soon Pill */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gold text-black font-semibold shadow-lg"
          >
            {/* Animated Rocket */}
            <motion.span
              animate={{ y: [0, -6, 0], rotate: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="text-lg"
            >
              🚀
            </motion.span>

            <span>Coming Soon</span>
          </motion.div>

          {/* Supporting Text */}
          <h2 className="font-heading text-2xl text-snow">
            Premium Case Study In Production
          </h2>

          <p className="text-pumice leading-relaxed max-w-3xl mx-auto">
            We’re crafting a detailed case study showcasing strategy, execution,
            creative thinking, and measurable impact. This page will soon feature
            behind-the-scenes insights, performance results, and real growth stories
            from 7ZeroMedia.
          </p>

        </motion.section>
      </div>
    </section>
  )
}

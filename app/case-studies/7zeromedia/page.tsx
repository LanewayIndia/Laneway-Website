"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function MediaCaseStudy() {
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
            src="/7zeromedia.png"
            alt="7ZeroMedia logo"
            width={400}
            height={240}
            className="mx-auto mb-8 object-contain"
            priority
          />

          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Case Study by Laneway
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-snow mt-6">
            Stay Tuned 
            <br />
            Coming Soon!
          </h1>
        </motion.div>

        {/* CHALLENGE */}
        {/* <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            The Challenge
          </h2>
          <p className="text-pumice leading-relaxed">
            Samyam had meticulously developed brand identity but needed a website
            that translated its spiritual-luxury philosophy visually and
            emotionally. The platform needed to feel calm, sacred, immersive and
            premium while supporting offerings, content and community building.
          </p>
        </motion.section> */}

        {/* SOLUTION */}
        {/* <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            Laneway’s Solution: Building a Digital Sanctuary
          </h2>

          <p className="text-pumice leading-relaxed mb-4">
            Laneway designed the website using soft gradients inspired by mandalas
            and divine light, calm minimal layouts, and imagery reflecting the
            sacred energy of Bharat’s teerthas, sadhanas and meditative spaces.
          </p>

          <p className="text-pumice leading-relaxed mb-4">
            Every detail followed Samyam’s brandbook — saffron and wisdom purple
            as primary colors, gold and pearl white as secondary palette, and
            carefully paired fonts for readability and spiritual elegance.
          </p>

          <p className="text-pumice leading-relaxed">
            The tone of copy was crafted as an invitation, not an advertisement —
            encouraging seekers to “Travel beyond. Discover within.”
          </p>
        </motion.section> */}

        {/* IMPACT */}
        {/* <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            Impact
          </h2>

          <ul className="space-y-2 text-pumice">
            <li>✔ Evokes spiritual awakening through design</li>
            <li>✔ Maintains strict brand consistency</li>
            <li>✔ Feels premium, calm and culturally rooted</li>
            <li>✔ Builds trust through refined storytelling</li>
            <li>✔ Creates strong foundation for future marketing & community building</li>
          </ul>
        </motion.section> */}
      </div>
    </section>
  )
}

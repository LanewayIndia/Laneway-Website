"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function VayoCaseStudy() {
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
            src="/Vayo.png"
            alt="VAYO logo"
            width={180}
            height={180}
            className="mx-auto mb-8 object-contain"
            priority
          />

          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Case Study by Laneway
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-snow mt-6">
            VAYO: Building a Hybrid Community Brand for Modern Social Connections
          </h1>
        </motion.div>

        {/* ABOUT */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            About the Brand: VAYO
          </h2>
          <p className="text-pumice leading-relaxed">
            Vayo is a Bangalore based community engagement brand which is designed
            to help people connect, offline and online, meaningfully. In a time
            after 20s where life is fast and hectic, genuine friendships are harder
            to form. Vayo creates a comfortable, activity driven space where
            individuals meet new people, share experience and build real
            connections.
          </p>
        </motion.section>

        {/* CHALLENGE */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            The Challenge
          </h2>
          <p className="text-pumice leading-relaxed">
            Vayo as a brand had a strong concept but faced challenges in the
            beginning like a defined brand identity, structured
            communication/marketing funnel, hybrid engagement model (digital +
            physical), visibility and consistent content and event strategy.
          </p>
        </motion.section>

        {/* STRATEGY */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            Our Strategy: Turning VAYO Into a Multi-Dimensional Community Brand
          </h2>

          <p className="text-pumice leading-relaxed mb-4">
            First, we created a clear Instagram brand identity and designed a
            consistent digital presence to help people recognize the brand. This
            included clean grid layouts, activity-based posters, vibrant colors,
            story highlights explaining offerings, and reels showcasing real
            participants and real moments.
          </p>

          <p className="text-pumice leading-relaxed mb-4">
            Secondly, we structured a Meta Ads strategy focusing on both digital
            and physical events, promoting Vayo as an inclusive community for
            anyone looking to try new activities and meet new people.
          </p>

          <p className="text-pumice leading-relaxed mb-4">
            Thirdly, we built strong digital communities through a WhatsApp
            community system with multiple interest-based groups, regular
            engagement, easy signups, and online gaming events and virtual
            hangouts.
          </p>

          <p className="text-pumice leading-relaxed">
            Lastly, strategic outreach to Bangalore city pages, creators and
            influencers helped expand Vayo's visibility across varied audience
            segments.
          </p>
        </motion.section>

        {/* RESULTS */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl text-snow mb-4">
            Results & Impact
          </h2>

          <ul className="space-y-2 text-pumice">
            <li>✔ Strong brand identity</li>
            <li>✔ Growth of community (online and offline)</li>
            <li>✔ Increased event participation by 5 times</li>
            <li>✔ High recall within Bangalore's social ecosystem</li>
            <li>✔ More activeness in WhatsApp community interactions</li>
            <li>✔ Successful launch of online communities</li>
            <li>✔ Scalable funnel from Instagram → WhatsApp → Events</li>
          </ul>
        </motion.section>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const caseStudies = [
  {
    id: "7ZeroMedia",
    name: "7ZeroMedia",
    tagline: "Stay Tuned! Coming Soon!",
    logo: "/7zeromedia.png",
    href: "/case-studies/7zeromedia",
    showDetails: false,
  },
  {
    id: "vayo",
    name: "VAYO",
    tagline: "Building a Hybrid Community Brand for Modern Social Connections",
    problem:
      "In a time after 20s where life is fast and hectic, genuine friendships are harder to form. Vayo creates a comfortable, activity driven space where individuals meet new people, share experience and build real connections.",
    solution:
      "We developed a The brand brings together two worlds: Offline meetups like bowling, Cubbon park gatherings, jam sessions and city activities & the online communities including gaming events, Whatsapp groups and digital hangouts.",
    results: [
      "Strong brand identity",
      "Growth of community (online and offline)",
      "Increased event participation by 5 times",
      "High recall within Bangalore's social ecosystem",
      "More activeness in Whatsapp community interactions",
      "Successful launch of online communities",
      "Scalable funned was made from Instagram → WhatsApp → events",
    ],
    logo: "/Vayo.png",
    href: "/case-studies/vayo",
    showDetails: true,
  },
  {
    id: "samyam",
    name: "Samyam",
    tagline: "Designing a Digital Sanctuary for India's Luxury Spiritual Tourism Brand",
    problem:
      "Samyam identifies that traditional spiritual travel (teerth yatra) often lacks the depth and structure required for true transformation",
    solution:
      "Samyam has created a transcendental experience that bridges the gap between ancient tradition and modern luxury.",
    results: [
      "Retreat listings and curated tour pages",
      "A dedicated website that offers seekers easy access to these meticulously planned, high-consciousness journeys.",
      "Blog style spiritual content",
    ],
    logo: "/Samyam.png",
    href: "/case-studies/samyam",
    showDetails: true,
  },
]

export function CaseStudiesList() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Visual / Logo */}
              {/* Visual / Brand Card */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative bg-card border border-border rounded-2xl overflow-hidden p-0 sm:p-0 lg:p-0"
                >
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-gold/20 to-gold-light/10" />

                  {/* Logo container */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="relative flex items-center justify-center aspect-square "
                  >
                    <Image
                      src={study.logo}
                      alt={`${study.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Bottom fade */}
                  {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" /> */}
                </motion.div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block">
                  {study.name}
                </span>

                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-snow mb-4">
                  {study.tagline}
                </h2>

                {/* <div className="space-y-6">
                  <div>
                    <h3 className="text-snow font-semibold mb-2">
                      The Challenge
                    </h3>
                    <p className="text-pumice leading-relaxed">
                      {study.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-snow font-semibold mb-2">
                      Our Solution
                    </h3>
                    <p className="text-pumice leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-snow font-semibold mb-3">
                      Results
                    </h3>
                    <ul className="space-y-2">
                      {study.results.map((result) => (
                        <li key={result} className="flex items-center gap-3">
                          <CheckCircle
                            size={18}
                            className="text-gold shrink-0"
                          />
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
                      <ArrowRight
                        size={18}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </Button>
                </div> */}
                {study.showDetails !== false && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-snow font-semibold mb-2">
                        The Challenge
                      </h3>
                      <p className="text-pumice leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-snow font-semibold mb-2">
                        Our Solution
                      </h3>
                      <p className="text-pumice leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-snow font-semibold mb-3">
                        Results
                      </h3>
                      <ul className="space-y-2">
                        {(study.results ?? []).map((result) => (
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
                        <ArrowRight
                          size={18}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </Button>
                  </div>

                )}


              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
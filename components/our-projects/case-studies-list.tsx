"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

const caseStudies = [

  {
    id: "Currice",
    category: "Client projects",
    name: "Currice",
    tagline: "Building the Founder. Building the Brand.",
    problem:
      "Currice had real traction on the ground — events, bookings, and a founder with a clear vision. But the digital presence wasn't keeping pace. Engagement on Instagram and LinkedIn was low, the four verticals weren't being communicated clearly, and the most powerful asset — the founder's story — wasn't being used at all.",
    solution: (
      <div className="space-y-4 pt-1">
        <div>
          At Laneway, we work with founders — not just brands. For Currice Foods, that meant one clear decision: put Sujay at the centre of the content, and build everything around his story, his events, and his world.
        </div>
        <div className="pl-4 border-l-2 border-gold italic opacity-90">
          Experiences like Currice's aren't sold through scheduled posts. They are sold through presence, story, and a voice people trust before they ever walk through the door.
        </div>
        <div className="space-y-1">
          <div>
            <span className="text-gold font-bold">01</span> <span className="text-snow font-bold">Instagram</span> — Consistent reels, stories, and community management capturing the energy of every Currice event.
          </div>
          <div>
            <span className="text-gold font-bold">02</span> <span className="text-snow font-bold">LinkedIn</span> — First-person posts written as Sujay — event recaps, founder reflections, milestones — targeting corporate and B2B audiences.
          </div>
          <div>
            <span className="text-gold font-bold">03</span> <span className="text-snow font-bold">Reddit</span> — Active participation in r/bangalore and relevant food communities to build organic reach.
          </div>
        </div>
      </div>
    ),
    results: [
    "Founder-led content strategy live across Instagram, LinkedIn, and Reddit",
    "Consistent content cadence established for the first time",
    "Sujay's personal brand being built alongside Currice Foods",
    "All four verticals clearly represented in the content ecosystem",
    "Community management running across all platforms",
    "Social Media Management",
    "Results compounding — month on month",
  ],
  logo: "/currice.png",
  href: "/our-projects/currice",
  showDetails: true,
  },

{
  id: "7ZeroMedia",
    category: "Our projects",
    name: "7ZeroMedia",
      tagline: "Building an AI-Powered, full-scale, next-generation media agency",
        problem:
  "7ZeroMedia needed a modern, scalable platform to manage their AI-powered media operations and client relationships.",
    solution:
  "We developed a sleek, user-friendly website that highlights 7ZeroMedia's innovative approach to media services, showcasing their AI capabilities and client success stories.",
    results: [
      "Branding & Identity",
      "Content Creation",
      "Increased event participation by 5 times",
      "complete media ecosystem",
      "bringing together content creation",
      "Social Media Management",
      "Editing & Post-Production",
    ],
      logo: "/7zeromedia.png",
        href: "/our-projects/7zeromedia",
          showDetails: true,
  },
{
  id: "vayo",
    category: "Our projects",
    name: "VAYO",
      tagline: "Building a Social Community Brand for Modern Social Connections",
        problem:
  "In a time after 20s where life is fast and hectic, genuine friendships are harder to form. Vayo creates a comfortable, activity driven space where individuals meet new people, share experience and build real connections.",
    solution:
  "The brand brings together two worlds: Offline meetups like bowling, Cubbon park gatherings, jam sessions and city activities & online communities including gaming events, WhatsApp groups and digital hangouts.", results: [
    "Strong brand identity",
    "Growth of community (online and offline)",
    "Increased event participation by 5 times",
    "High recall within Bangalore's social ecosystem",
    "More activeness in Whatsapp community interactions",
    "Successful launch of online communities",
    "Scalable funnel was made from Instagram → WhatsApp → events",
  ],
    logo: "/Vayo.png",
      href: "/our-projects/vayo",
        showDetails: true,
  },
{
  id: "samyam",
    category: "Client projects",
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
        href: "/our-projects/samyam",
          showDetails: true,
  },
]

export function CaseStudiesList() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Our projects", "Client projects", "Other case studies"];

  const filteredStudies = caseStudies.filter(
    (study) => activeFilter === "All" || study.category === activeFilter
  );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-16">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-gold text-background border border-gold"
                    : "border border-border text-pumice hover:text-snow hover:border-gold/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Case Studies List */}
          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            {filteredStudies.map((study, index) => (
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
                      <div className="text-pumice leading-relaxed">
                        {study.problem}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-snow font-semibold mb-2">
                        Our Solution
                      </h3>
                      <div className="text-pumice leading-relaxed">
                        {study.solution}
                      </div>
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

            {filteredStudies.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed border-border/60 bg-card/20 group hover:border-gold/30 transition-colors cursor-default"
              >
                <div className="relative mb-6">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gold/10 blur-2xl rounded-full scale-150 transition-all group-hover:bg-gold/20 group-hover:scale-[1.75] duration-700" />
                  
                  {/* Floating Rocket Icon */}
                  <motion.div
                    animate={{ 
                      y: [0, -12, 0],
                      x: [0, 6, 0],
                      rotate: [-5, 8, -5] 
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="relative text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                  >
                    <Rocket size={64} strokeWidth={1} />
                  </motion.div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-snow mb-3">
                  Coming Soon
                </h3>
                <p className="text-pumice max-w-sm">
                  We are actively preparing new experiences and case studies for this section. Ready for liftoff soon!
                </p>
              </motion.div>
            )}
        </div>
      </div>
    </section>
  )
}
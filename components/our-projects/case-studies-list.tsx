"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CaseStudy {
  id: string;
  category: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  results: string[];
  logo: string;
  href: string;
  showDetails: boolean;
  status?: "active" | "inactive";
}

const staticCaseStudies: CaseStudy[] = [
  {
    id: "Currice",
    category: "Client projects",
    name: "Currice",
    tagline: "Building the Founder. Building the Brand.",
    problem: "Currice had real traction on the ground — events, bookings, and a founder with a clear vision. But the digital presence wasn't keeping pace. Engagement on Instagram and LinkedIn was low, the four verticals weren't being communicated clearly, and the most powerful asset — the founder's story — wasn't being used at all.",
    solution: "At Laneway, we work with founders — not just brands. For Currice Foods, that meant one clear decision: put Sujay at the centre of the content, and build everything around his story, his events, and his world.",
    results: [
      "Founder-led content strategy live across Instagram, LinkedIn, and Reddit",
      "Consistent content cadence established for the first time",
      "Sujay's personal brand being built alongside Currice Foods",
      "All four verticals clearly represented in the content ecosystem",
      "Community management running across all platforms",
      "Social Media Management",
      "Results compounding — month on month"
    ],
    logo: "/currice.png",
    href: "/our-projects/currice",
    showDetails: true
  },
  {
    id: "7ZeroMedia",
    category: "Our projects",
    name: "7ZeroMedia",
    tagline: "Building an AI-Powered, full-scale, next-generation media agency",
    problem: "7ZeroMedia needed a modern, scalable platform to manage their AI-powered media operations and client relationships.",
    solution: "We developed a sleek, user-friendly website that highlights 7ZeroMedia's innovative approach to media services, showcasing their AI capabilities and client success stories.",
    results: [
      "Branding & Identity",
      "Content Creation",
      "Increased event participation by 5 times",
      "Complete media ecosystem",
      "Bringing together content creation",
      "Social Media Management",
      "Editing & Post-Production"
    ],
    logo: "/7zeromedia.png",
    href: "/our-projects/7zeromedia",
    showDetails: true
  }
];

export function CaseStudiesList() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [studies, setStudies] = useState<CaseStudy[]>(staticCaseStudies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("laneway-case-studies");
    if (saved) {
      const savedStudies = JSON.parse(saved) as CaseStudy[];
      const activeSaved = savedStudies.filter((s) => s.status !== "inactive");
      setStudies([...staticCaseStudies, ...activeSaved]);
    }
    setLoading(false);
  }, []);

  const filters = ["All", "Our projects", "Client projects", "Other case studies"];

  const filteredStudies = studies.filter(
    (study) => activeFilter === "All" || study.category === activeFilter
  );

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-gold text-background border border-gold"
                    : "border border-border text-pumice hover:text-snow hover:border-gold/50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

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
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative bg-card border border-border rounded-2xl overflow-hidden p-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-gold-light/10" />
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      className="relative flex items-center justify-center aspect-square"
                    >

                      {study.logo?.startsWith('/') || study.logo.startsWith('http') ? (
                        <Image
                          src={study.logo}
                          alt={`${study.name} logo`}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-lg">
                          <span className="text-gray-500 text-sm font-medium">Logo Missing</span>
                        </div>
                      )}

                    </motion.div>
                  </motion.div>
                </div>

                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="text-gold font-medium tracking-wider uppercase text-sm mb-2 block">
                    {study.name}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-snow mb-4">
                    {study.tagline}
                  </h2>
                  {study.showDetails && (
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
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-center gap-3">
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
            {filteredStudies.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed border-border/60 bg-card/20"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gold/10 blur-2xl rounded-full scale-150" />
                  <Rocket size={64} strokeWidth={1} className="text-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-snow mb-3">
                  Coming Soon
                </h3>
                <p className="text-pumice max-w-sm">
                  We are actively preparing new experiences and case studies for this section.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

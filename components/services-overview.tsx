"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Brain,
  TrendingUp,
  Briefcase,
  Code,
  Rocket,
  Globe,
  Building,
  Settings,
  ClipboardList,
  Megaphone,
  ArrowUpRight,
} from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "AI Technology",
    description: "Transform operations with artificial intelligence.",
    href: "/services#ai-tech",
  },
  {
    icon: TrendingUp,
    title: "AI Marketing",
    description: "Data-driven strategies powered by AI.",
    href: "/services#ai-marketing",
  },
  {
    icon: Briefcase,
    title: "Consulting",
    description: "Strategic guidance for complex challenges.",
    href: "/services#consulting",
  },
  {
    icon: Code,
    title: "Software",
    description: "Custom solutions with cutting-edge tech.",
    href: "/services#software",
  },
  {
    icon: Rocket,
    title: "MVP Building",
    description: "Rapid prototyping for startups.",
    href: "/services#mvp",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance websites that convert.",
    href: "/services#web",
  },
  {
    icon: Building,
    title: "Incubator",
    description: "Capital and mentorship for startups.",
    href: "/services#incubator",
  },
  {
    icon: Settings,
    title: "Operations",
    description: "Streamline for maximum efficiency.",
    href: "/services#operations",
  },
  {
    icon: ClipboardList,
    title: "Administration",
    description: "Comprehensive business support.",
    href: "/services#admin",
  },
  {
    icon: Megaphone,
    title: "Branding",
    description: "Full-service media solutions.",
    href: "/services#branding",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-gold/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"
        >
          <div>
            <span className="text-xs tracking-premium uppercase text-pumice mb-6 block">What We Do</span>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-snow">Our Services</h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm text-pumice hover:text-snow transition-colors duration-300"
          >
            <span>View All Services</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
            >
              <Link href={service.href} className="group block h-full">
                <div className="relative p-6 h-full glass-card rounded-xl transition-all duration-500 hover:border-gold/20 overflow-hidden">
                  {/* Hover highlight */}
                  <div className="absolute inset-0 rounded-xl bg-linear-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <service.icon size={20} className="text-gold" strokeWidth={1.5} />
                      <ArrowUpRight
                        size={14}
                        className="text-pumice opacity-0 group-hover:opacity-100 group-hover:text-gold transition-all duration-300"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-medium text-snow mb-2 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-pumice text-xs leading-relaxed">{service.description}</p>
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

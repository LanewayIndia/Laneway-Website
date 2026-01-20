"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blogs", href: "/blogs" },
  { name: "Careers", href: "/careers" },
  { name: "About Us", href: "/about" },
]

const services = [
  { name: "AI Solutions", href: "/services#ai-solutions" },
  { name: "Software Development", href: "/services#software" },
  { name: "Business Consulting", href: "/services#consulting" },
  { name: "Startup Incubator", href: "/services#incubator" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-glass-border">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading text-2xl font-bold text-snow">Laneway</span>
            </Link>
            <p className="text-pumice text-sm leading-relaxed mb-6">
              Transforming ideas into digital excellence through innovative solutions.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors"
            >
              <span>Begin Your Transformation</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs tracking-premium uppercase text-pumice mb-6">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-snow/70 hover:text-snow transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs tracking-premium uppercase text-pumice mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-snow/70 hover:text-snow transition-colors duration-300 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xs tracking-premium uppercase text-pumice mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="text-snow/70 text-sm">Global Operations</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                <a href="tel:9961348942" className="text-snow/70 hover:text-snow transition-colors text-sm">
                  +91 9961348942
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                <a href="mailto:Info@laneway.in" className="text-snow/70 hover:text-snow transition-colors text-sm">
                  Info@laneway.in
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-glass-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-pumice/60 text-sm">© {new Date().getFullYear()} Laneway. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="text-pumice/60 hover:text-snow text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-pumice/60 hover:text-snow text-sm transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

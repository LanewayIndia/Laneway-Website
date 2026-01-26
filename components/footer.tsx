"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, ArrowUpRight, Instagram, Linkedin, X, Globe, Facebook, Twitter } from "lucide-react"
import Image from "next/image"

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

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/lanewayindia",
    icon: Instagram,
  },
  {
    name: "Twitter",
    href: "https://x.com/lanewayindia",
    icon: Twitter,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/company/laneway-india/",
    icon: Linkedin,
  },
  {
    name: "Website",
    href: "https://laneway.in",
    icon: Globe,
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-glass-border">
      <div className="absolute inset-0 bg-linear-to-b from-gold/2 to-transparent pointer-events-none" />

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
              <span className="flex flex-col font-heading text-2xl font-bold text-snow">
                <Image
                  src="/Laneway-Logo.png"
                  alt="Laneway Logo"
                  width={40}
                  height={40}
                  className="h-5 w-auto"
                  priority
                />
                Laneway
              </span>
            </Link>
            <p className="text-pumice text-sm leading-relaxed mb-6">
              Laneway is a next-gen AI-Powered business consulting firm committed to help drive business growth through consulting, technology and media services.
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
                <div className="text-snow/70 text-sm">
                  <div className="font-medium text-snow mb-1">Head Office</div>
                  <div className="space-y-0.5">
                    <p>1087 B, Sankranthi, Perumbaikkad</p>
                    <p>Kottayam - 686016, Kerala</p>
                  </div>
                  {/* <a
                    href="https://www.google.com/maps/place/1087%2FB,+Sankranthi,+Kottayam,+Perumbaikad,+Kerala+686016/@9.6250908,76.5343883,17z/data=!3m1!4b1!4m10!1m2!2m1!1s1087+B,+Sankranthi,+Perumbaikkad,++Kottayam+-+686016,+Kerala!3m6!1s0x3b062b506f299b43:0x3c9adcd568e4052e!8m2!3d9.6250908!4d76.5392592!15sCjwxMDg3IEIsIFNhbmtyYW50aGksIFBlcnVtYmFpa2thZCwgIEtvdHRheWFtIC0gNjg2MDE2LCBLZXJhbGGSAQpzdWJwcmVtaXNl4AEA!16s%2Fg%2F11xz04j64r?entry=ttu&g_ep=EgoyMDI2MDExOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pumice hover:text-gold transition-colors inline-block mt-1"
                  >
                    View on Google Maps →
                  </a> */}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <div className="text-snow/70 text-sm">
                  <div className="font-medium text-snow mb-1">Operational Office</div>
                  <div className="space-y-0.5">
                    <p>Koramangala 8th Block</p>
                    <p>Bangalore - 560095, Karnataka</p>
                  </div>
                  {/* <a
                    href="https://www.google.com/maps/place/Koramangala+8th+Block,+Koramangala,+Bengaluru,+Karnataka/@12.9410853,77.6127627,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae1448a71f8e4d:0x17f8352eed30fa02!8m2!3d12.9414686!4d77.6178125!16s%2Fg%2F1ts1l25j?entry=ttu&g_ep=EgoyMDI2MDExOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pumice hover:text-gold transition-colors inline-block mt-1"
                  >
                    View on Google Maps →
                  </a> */}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                <a href="tel:9961348942" className="text-snow/70 hover:text-snow transition-colors text-sm">
                  +91 9961348942
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                <a href="mailto:info@laneway.in" className="text-snow/70 hover:text-snow transition-colors text-sm">
                  info@laneway.in
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
            <p className="text-pumice/60 text-sm">© {new Date().getFullYear()} Laneway India Enterprises Private LimitedAlly.       
              <br />
            All rights reserved.
              GST: 32AAGCL2491R1Z0
            </p>

            <div className="flex items-center justify-center gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-glass-border text-pumice transition-all duration-300 hover:border-gold/60 hover:text-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                  >
                    <Icon
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-8">
              <Link href="/privacy" className="text-pumice/60 hover:text-snow text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-pumice/60 hover:text-snow text-sm transition-colors">
                Terms & Services
              </Link>
              <Link href="/cookie-policy" className="text-pumice/60 hover:text-snow text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

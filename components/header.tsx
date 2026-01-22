"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight } from "lucide-react"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blogs" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Careers", href: "/careers" },
  { name: "About Us", href: "/about" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-glass-border" : "bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-20 sm:h-24 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <motion.span
              className="font-heading text-2xl font-bold tracking-tight text-snow"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.3 }}
            >

              <motion.span
                className="font-heading text-2xl font-bold tracking-tight text-gold flex items-center gap-2"
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/Laneway-Logo.png"
                  alt="Laneway Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
                LANEWAY
              </motion.span>

            </motion.span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-normal text-pumice hover:text-snow transition-colors duration-300 group"
              >
                <span className="tracking-wide">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-background bg-snow rounded-full transition-all duration-300 hover:bg-gold"
            >
              <span>Begin Your Transformation</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-snow hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-glass-border"
          >
            <nav className="flex flex-col px-6 py-8 gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-2xl font-heading font-medium text-snow hover:text-gold transition-colors py-3"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.4 }}
                className="pt-6 mt-4 border-t border-glass-border"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-background bg-snow rounded-full"
                >
                  Get In Touch
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const STORAGE_KEY = "laneway_cookie_consent"

export type CookieConsent = "accepted" | "rejected" | null

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CookieConsent
    if (stored) setConsent(stored)
  }, [])

  const handleConsent = (value: CookieConsent) => {
    localStorage.setItem(STORAGE_KEY, value!)
    setConsent(value)
  }

  return (
    <AnimatePresence>
      {consent === null && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-2xl border border-border bg-background p-6 shadow-2xl"
        >
          <p className="text-sm text-pumice mb-4">
            We use cookies to enhance your experience, analyze site traffic,
            and personalize content. Read our{" "}
            <Link href="/cookie-policy" className="text-gold hover:text-gold-light">
              Cookie Policy
            </Link>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              onClick={() => handleConsent("rejected")}
              className="rounded-full border border-border px-5 py-2 text-sm text-pumice hover:text-snow transition"
            >
              Reject Non-Essential
            </button>

            <button
              onClick={() => handleConsent("accepted")}
              className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-background hover:bg-gold-light transition"
            >
              Accept All Cookies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

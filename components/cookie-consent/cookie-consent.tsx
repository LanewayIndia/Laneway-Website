"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import type { CookiePreferences } from "@/lib/cookie-consent"
import { getCookiePreferences, setCookiePreferences } from "@/lib/cookie-consent"
import { CookieSettingsModal } from "./cookie-settings-modal"


// const STORAGE_KEY = "laneway_cookie_consent"

export type CookieConsent = "accepted" | "rejected" | null

export function CookieConsentBanner() {
  const [show, setShow] = useState(false)
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  })
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const stored = getCookiePreferences()
    if (stored) setPrefs(stored)
    else setShow(true)
  }, [])


  //   const stored = localStorage.getItem(STORAGE_KEY) as CookieConsent
  //   if (stored) setConsent(stored)
  // }, [])

  // const handleConsent = (value: CookieConsent) => {
  //   localStorage.setItem(STORAGE_KEY, value!)
  //   setConsent(value)


  return (
    <>
    <AnimatePresence>
      {show && (
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

          {/*Toggles */}
          {/* <div className="space-y-3 mb-6"> */}
            {/* <ConsentRow
              label="Essential Cookies"
              description="These cookies are necessary for the website to function and cannot be disabled."
              disabled
              checked={true}
            />

            <ConsentRow
              label="Analytics Cookies"
              description="Helps us understand site usage"
              checked={prefs.analytics}
              onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
            />

            <ConsentRow
              label="Marketing Cookies"
              description="Used for advertising & remarketing"
              checked={prefs.marketing}
              onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
            /> */}
          {/* </div> */}

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
                onClick={() => setSettingsOpen(true)}
                className="px-4 py-2 text-sm text-pumice hover:text-snow"
              >
                Settings
              </button>
            <button
              onClick={() => {
                setCookiePreferences({
                  essential: true,
                  analytics: false,
                  marketing: false,
                })
                setShow(false)
              }}

              className="rounded-full border border-border px-5 py-2 text-sm text-pumice hover:text-snow transition"
            >
              Reject Non-Essential
            </button>
            <button
              onClick={() => {
                setCookiePreferences({
                  essential: true,
                  analytics: true,
                  marketing: true,
                })
                setShow(false)
              }}
              className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-background hover:bg-gold-light transition"
            >
              Accept All Cookies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

      <CookieSettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}

// function ConsentRow({
//   label,
//   description,
//   checked = false,
//   disabled = false,
//   onChange,
// }: {
//   label: string
//   description?: string
//   checked?: boolean
//   disabled?: boolean
//   onChange?: (v: boolean) => void
// }) {
//   return (
//     <label className="flex items-start justify-between gap-4">
//       <div className="flex-1">
//         <div className="text-sm text-snow font-medium">{label}</div>
//         {description && <div className="text-xs text-pumice">{description}</div>}
//       </div>

//       <input
//         type="checkbox"
//         checked={checked}
//         disabled={disabled}
//         onChange={(e) => onChange?.(e.target.checked)}
//         className="h-4 w-4"
//       />
//     </label>
//   )
// }
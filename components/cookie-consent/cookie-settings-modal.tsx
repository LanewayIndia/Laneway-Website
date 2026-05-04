"use client"

import { motion, AnimatePresence } from "framer-motion"
import { setCookiePreferences } from "@/lib/cookie-consent"

type Props = {
  open: boolean
  onClose: () => void
}

export function CookieSettingsModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background border border-border rounded-2xl p-6 w-full max-w-lg"
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 20 }}
          >
            <h3 className="font-heading text-xl text-snow mb-4">
              Cookie Preferences
            </h3>

            <div className="space-y-4 text-sm text-pumice">
              <label className="flex justify-between items-center">
                <span>Essential Cookies</span>
                <span className="text-gold">Always On</span>
              </label>

              <label className="flex justify-between items-center">
                <span>Analytics Cookies</span>
                <input type="checkbox" id="analytics" />
              </label>

              <label className="flex justify-between items-center">
                <span>Marketing Cookies</span>
                <input type="checkbox" id="marketing" />
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-pumice hover:text-snow"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setCookiePreferences({
                    essential: true,
                    analytics:
                      (document.getElementById("analytics") as HTMLInputElement)
                        ?.checked ?? false,
                    marketing:
                      (document.getElementById("marketing") as HTMLInputElement)
                        ?.checked ?? false,
                  })
                  window.location.reload()
                }}
                className="px-5 py-2 rounded-full bg-gold text-background font-semibold"
              >
                Save Preferences
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

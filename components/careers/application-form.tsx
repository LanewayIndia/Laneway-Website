"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ApplicationFormModal({
  open,
  onClose,
  jobTitle,
}: {
  open: boolean
  onClose: () => void
  jobTitle: string
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div
              className="relative w-full max-w-xl rounded-2xl bg-background border border-border p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-2xl font-semibold text-snow">
                  Application Form
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-pumice hover:text-snow transition"
                  aria-label="Close form"
                >
                </button>
              </div>

              {/* Form */}
              <form className="space-y-6">
                <input type="hidden" name="jobTitle" value={jobTitle} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-pumice mb-2">
                      Full Name
                    </label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm text-pumice mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-pumice mb-2">
                    Position of Interest
                  </label>
                  <Input value={jobTitle} readOnly />
                </div>

                <div>
                  <label className="block text-sm text-pumice mb-2">
                    Portfolio / LinkedIn URL
                  </label>
                  <Input placeholder="https://..." />
                </div>

                <div>
                  <label className="block text-sm text-pumice mb-2">
                    Cover Letter
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Tell us about yourself and why you'd be a great fit..."
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-light text-background font-semibold py-6 rounded-full"
                >
                  Submit Application
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

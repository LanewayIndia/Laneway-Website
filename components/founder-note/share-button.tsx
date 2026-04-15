"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Share2,
  Link2,
  Check,
  Twitter,
  Linkedin,
} from "lucide-react"

const SHARE_URL = "https://www.laneway.in/founder-note"
const SHARE_TITLE = "One Year of Laneway — A note from Gokul M Prabhu"
const SHARE_TEXT =
  "A year ago, Laneway did not exist. Read how it started with a simple intention to help, and where it is heading next."

const platforms = [
  {
    id: "copy",
    label: "Copy Link",
    icon: Link2,
    color: "hover:text-snow hover:bg-white/10",
    action: () => {},
  },
  {
    id: "twitter",
    label: "Share on X",
    icon: Twitter,
    color: "hover:text-sky-400 hover:bg-sky-400/10",
    action: () =>
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          SHARE_TEXT
        )}&url=${encodeURIComponent(SHARE_URL)}`,
        "_blank"
      ),
  },
  {
    id: "linkedin",
    label: "Share on LinkedIn",
    icon: Linkedin,
    color: "hover:text-blue-400 hover:bg-blue-400/10",
    action: () =>
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          SHARE_URL
        )}`,
        "_blank"
      ),
  },
  {
    id: "whatsapp",
    label: "Share on WhatsApp",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.528 5.845L.057 23.998l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.847 9.847 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.862 9.862 0 012.1 12c0-5.461 4.439-9.9 9.9-9.9 5.461 0 9.9 4.439 9.9 9.9 0 5.461-4.439 9.9-9.9 9.9z" />
      </svg>
    ),
    color: "hover:text-green-400 hover:bg-green-400/10",
    action: () =>
      window.open(
        `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`,
        "_blank"
      ),
  },
]

export function ShareButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function handleToggle() {
    // Try native share on mobile first
    if (!open && navigator.share) {
      navigator
        .share({ title: SHARE_TITLE, text: SHARE_TEXT, url: SHARE_URL })
        .catch(() => setOpen(true))
      return
    }
    setOpen((v) => !v)
  }

  function handleCopy() {
    navigator.clipboard.writeText(SHARE_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div ref={ref} className="relative inline-block">
      {/* Trigger button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-pumice hover:text-snow hover:border-gold/40 hover:bg-gold/5 transition-colors duration-200 text-sm font-medium backdrop-blur-sm cursor-pointer"
        aria-expanded={open}
        aria-label="Share this page"
      >
        <motion.span
          animate={{ rotate: open ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Share2 className="w-4 h-4" />
        </motion.span>
        Share
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-52 rounded-2xl border border-white/10 bg-[#0f0f0f]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden z-50"
          >
            {/* Top label */}
            <div className="px-4 pt-3 pb-2 border-b border-white/5">
              <p className="text-xs text-pumice/50 uppercase tracking-widest">Share via</p>
            </div>

            <div className="p-2">
              {platforms.map((platform, i) => {
                const Icon = platform.icon
                const isCopyBtn = platform.id === "copy"

                return (
                  <motion.button
                    key={platform.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      if (isCopyBtn) {
                        handleCopy()
                      } else {
                        platform.action()
                        setOpen(false)
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-pumice/80 transition-all duration-150 cursor-pointer ${platform.color}`}
                  >
                    <span className="w-4 h-4 shrink-0">
                      {isCopyBtn ? (
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Check className="w-4 h-4 text-green-400" />
                            </motion.span>
                          ) : (
                            <motion.span key="link" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Link2 className="w-4 h-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      ) : (
                        <Icon />
                      )}
                    </span>
                    <span>{isCopyBtn && copied ? "Copied!" : platform.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

export function AnimatedServiceIcon({
  icon: Icon,
  size = 26,
}: {
  icon: LucideIcon
  size?: number
}) {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-gold/10 overflow-hidden">

      {/* Glow Pulse */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gold/20 blur-xl"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ripple Ring */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-gold/20"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Icon */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Icon size={size} className="text-gold" strokeWidth={1.5} />
      </motion.div>
    </div>
  )
}

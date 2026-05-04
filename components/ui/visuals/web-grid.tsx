"use client"
import { motion } from "framer-motion"

export function WebGrid() {
  return (
    <div className="relative w-80 h-52 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,85,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,85,0.08)_1px,transparent_1px)] bg-size-[32px_32px]" />

      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-gold/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}


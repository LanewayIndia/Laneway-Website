"use client"
import { motion } from "framer-motion"

export function CodeStream() {
  return (
    <motion.div className="relative w-72 h-72">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-24 bg-gold/25"
          style={{ left: `${i * 12 + 10}%` }}
          animate={{ y: [-80, 260] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </motion.div>
  )
}

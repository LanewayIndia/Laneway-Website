"use client"
import { motion } from "framer-motion"

export function MediaWave() {
  return (
    <motion.div className="relative w-72 h-72 flex items-center justify-center">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-gold/20"
          style={{ width: 140 + i * 40, height: 140 + i * 40 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity }}
        />
      ))}
    </motion.div>
  )
}

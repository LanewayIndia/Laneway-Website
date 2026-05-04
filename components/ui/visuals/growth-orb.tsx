"use client"
import { motion } from "framer-motion"

export function GrowthOrb() {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full bg-gold/15 blur-2xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="w-28 h-28 rounded-full border border-gold/50"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold rounded-full"
          animate={{
            rotate: 360,
            x: [0, 120, 0],
            y: [0, -120, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  )
}
"use client"
import { motion } from "framer-motion"

export function OpsMachine() {
  return (
    <motion.div className="relative w-72 h-72">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 border border-gold/20 rounded-lg"
          style={{
            top: `${20 + i * 8}%`,
            left: `${20 + i * 8}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </motion.div>
  )
}

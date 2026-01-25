"use client"

import { motion } from "framer-motion"

export function AICoreOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">

      {/* Soft ambient glow */}
      <div className="absolute w-72 h-72 bg-gold/20 blur-[120px] rounded-full" />

      {/* Outer orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-80 h-80 border border-gold/10 rounded-full"
      />

      {/* Inner orbit ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-60 h-60 border border-gold/20 rounded-full"
      />

      {/* Core glowing orb */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-32 h-32 rounded-full bg-linear-to-br from-gold via-gold-light to-gold shadow-[0_0_80px_rgba(201,168,85,0.5)]"
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />

        {/* Light shimmer */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-white/20"
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2 }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-2 h-2 bg-gold rounded-full blur-sm"
          style={{
            top: `${20 + i * 10}%`,
            left: `${30 + i * 8}%`,
          }}
        />
      ))}
    </div>
  )
}

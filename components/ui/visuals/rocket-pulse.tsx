"use client"
import { motion } from "framer-motion"
import { Rocket } from "lucide-react"

export function RocketPulse() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      <Rocket size={130} className="text-gold/25" strokeWidth={0.6} />
    </motion.div>
  )
}

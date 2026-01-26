// "use client"

// import { motion } from "framer-motion"

// export function AICoreReactor() {
//   return (
//     <motion.div className="relative w-72 h-72">
//       <motion.div
//         className="absolute inset-0 rounded-full border border-gold/20"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute inset-8 rounded-full bg-gold/10 blur-2xl"
//         animate={{ scale: [1, 1.12, 1] }}
//         transition={{ duration: 3, repeat: Infinity }}
//       />
//       <div className="absolute inset-0 flex items-center justify-center text-gold font-heading text-4xl">
//         AI
//       </div>
//     </motion.div>
//   )
// }

"use client"

import Lottie from "lottie-react"
import animationData from "@/public/lottie-Animations/Ai-powered Tech.json"

export function AICoreReactor() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Lottie 
        animationData={animationData} 
        loop 
        className="w-full max-w-105"
      />
    </div>
  )
}
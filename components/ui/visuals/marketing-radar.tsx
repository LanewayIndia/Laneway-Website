// "use client"
// import { motion } from "framer-motion"

// export function MarketingRadar() {
//   return (
//     <div className="relative w-72 h-72">
//       <motion.div
//         className="absolute inset-0 rounded-full border border-gold/30"
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute inset-6 rounded-full border border-gold/20"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute inset-16 rounded-full bg-gold/10 blur-xl"
//         animate={{ opacity: [0.3, 0.7, 0.3] }}
//         transition={{ duration: 2.5, repeat: Infinity }}
//       />
//     </div>
//   )
// }

"use client"

import Lottie from "lottie-react"
import animationData from "@/public/lottie-Animations/Business-Adim.json"

export function MarketingRadar() {
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
// "use client"

// import { motion } from "framer-motion"
// import { Brain } from "lucide-react"

// export function AIBrainPulse() {
//   return (
//     <motion.div
//       className="relative flex items-center justify-center"
//       animate={{ scale: [1, 1.08, 1] }}
//       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//     >
//       <motion.div
//         className="absolute w-64 h-64 rounded-full bg-gold/10 blur-3xl"
//         animate={{ opacity: [0.2, 0.5, 0.2] }}
//         transition={{ duration: 3, repeat: Infinity }}
//       />

//       <Brain size={140} className="text-gold/25" strokeWidth={0.6} />
//     </motion.div>
//   )
// }

"use client"

import Lottie from "lottie-react"
import animationData from "@/public/lottie-Animations/AI-Business-Consulting.json"

export function AIBrainPulse() {
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
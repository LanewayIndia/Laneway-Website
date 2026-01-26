// "use client"
// import { motion } from "framer-motion"

// export function MediaWave() {
//   return (
//     <motion.div className="relative w-72 h-72 flex items-center justify-center">
//       {[...Array(4)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full border border-gold/20"
//           style={{ width: 140 + i * 40, height: 140 + i * 40 }}
//           animate={{ scale: [1, 1.05, 1] }}
//           transition={{ duration: 4 + i, repeat: Infinity }}
//         />
//       ))}
//     </motion.div>
//   )
// }


"use client"

import Lottie from "lottie-react"
import animationData from "@/public/lottie-Animations/BrandingMedia-Growth.json"

export function MediaWave() {
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

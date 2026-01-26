// "use client"
// import { motion } from "framer-motion"

// export function AdminFlow() {
//   return (
//     <motion.div className="relative w-72 h-72">
//       {[...Array(10)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-2 h-2 bg-gold rounded-full"
//           animate={{ y: [-40, 200], opacity: [0, 1, 0] }}
//           transition={{ duration: 3 + i * 0.3, repeat: Infinity }}
//           style={{ left: `${i * 8}%` }}
//         />
//       ))}
//     </motion.div>
//   )
// }

"use client"

import Lottie from "lottie-react"
import animationData from "@/public/lottie-Animations/Business-Adim.json"

export function AdminFlow() {
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
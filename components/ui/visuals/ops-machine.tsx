// "use client"
// import { motion } from "framer-motion"

// export function OpsMachine() {
//   return (
//     <motion.div className="relative w-72 h-72">
//       {[...Array(6)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-16 h-16 border border-gold/20 rounded-lg"
//           style={{
//             top: `${20 + i * 8}%`,
//             left: `${20 + i * 8}%`,
//           }}
//           animate={{ rotate: 360 }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//         />
//       ))}
//     </motion.div>
//   )
// }

"use client"

import Lottie from "lottie-react"
import animationData from "@/public/lottie-Animations/Operation-management.json"

export function OpsMachine() {
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
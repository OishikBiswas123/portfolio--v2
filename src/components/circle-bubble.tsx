'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CircleBubbleProps {
  children: ReactNode
  delay?: number
  color?: string
}

export function CircleBubble({ children, delay = 0, color = 'pink' }: CircleBubbleProps) {
  const colorMap: Record<string, string> = {
    pink: 'from-pink-400/30 to-purple-500/30 border-pink-400/40',
    blue: 'from-blue-400/30 to-cyan-500/30 border-blue-400/40',
    green: 'from-green-400/30 to-emerald-500/30 border-green-400/40',
    yellow: 'from-yellow-400/30 to-orange-500/30 border-yellow-400/40',
    purple: 'from-purple-400/30 to-indigo-500/30 border-purple-400/40',
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }}
    >
      {/* Orbiting small bubbles */}
      <motion.div
        className="absolute -top-1 left-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-70"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformOrigin: "50% 80px" }}
      />
      <motion.div
        className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 opacity-60"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformOrigin: "-60px 50%" }}
      />
      <motion.div
        className="absolute -bottom-1 left-1/3 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 opacity-50"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformOrigin: "30px -70px" }}
      />

      {/* Main circle */}
      <motion.div
        className={`relative w-40 h-40 rounded-full bg-gradient-to-br ${colorMap[color]} backdrop-blur-md border-2 flex flex-col items-center justify-center cursor-pointer`}
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 3 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.1,
          rotate: [0, -5, 5, 0],
          boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)",
        }}
      >
        {/* Inner glow ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-white/20"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center px-2">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

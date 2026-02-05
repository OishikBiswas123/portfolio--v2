'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CircleBubbleProps {
  children: ReactNode
  delay?: number
  color?: string
}

export function CircleBubble({ children, delay = 0, color = 'pink' }: CircleBubbleProps) {
  const colorMap: Record<string, { bg: string, border: string, shadow: string }> = {
    pink: { 
      bg: 'from-pink-200/40 via-pink-300/40 to-purple-400/40',
      border: 'border-pink-300/30',
      shadow: 'shadow-pink-400/10'
    },
    blue: { 
      bg: 'from-blue-200/40 via-blue-300/40 to-cyan-400/40',
      border: 'border-blue-300/30',
      shadow: 'shadow-blue-400/10'
    },
    green: { 
      bg: 'from-emerald-200/40 via-emerald-300/40 to-teal-400/40',
      border: 'border-emerald-300/30',
      shadow: 'shadow-emerald-400/10'
    },
    yellow: { 
      bg: 'from-yellow-200/40 via-yellow-300/40 to-orange-400/40',
      border: 'border-yellow-300/30',
      shadow: 'shadow-yellow-400/10'
    },
    purple: { 
      bg: 'from-purple-200/40 via-purple-300/40 to-indigo-400/40',
      border: 'border-purple-300/30',
      shadow: 'shadow-purple-400/10'
    },
    cyan: { 
      bg: 'from-cyan-200/40 via-cyan-300/40 to-blue-400/40',
      border: 'border-cyan-300/30',
      shadow: 'shadow-cyan-400/10'
    },
    orange: { 
      bg: 'from-orange-200/40 via-orange-300/40 to-red-400/40',
      border: 'border-orange-300/30',
      shadow: 'shadow-orange-400/10'
    },
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
        className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-2 bg-gradient-to-br ${colorMap[color].bg} ${colorMap[color].border} cursor-pointer`}
        animate={{
          y: [0, -10],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }
        }}
        whileHover={{
          scale: 1.1,
          rotate: -5,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Inner glow ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-white/30"
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

        {/* Gradient shine overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent" />

        {/* Second gradient layer for depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-transparent via-transparent to-black/10" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-3">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

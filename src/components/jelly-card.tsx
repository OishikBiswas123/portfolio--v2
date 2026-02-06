'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface JellyCardProps {
  children: ReactNode
  className?: string
  delay?: number
  color?: string
  onClick?: () => void
}

export function JellyCard({ children, className = '', delay = 0, color = 'pink', onClick }: JellyCardProps) {
  const colorMap: Record<string, { bg: string, border: string, orbiting: string[] }> = {
    pink: { 
      bg: 'from-pink-200/40 via-pink-300/40 to-purple-400/40',
      border: 'border-pink-300/30',
      orbiting: ['from-pink-400 to-purple-400', 'from-purple-400 to-pink-500', 'from-pink-300 to-purple-400']
    },
    blue: { 
      bg: 'from-blue-200/40 via-blue-300/40 to-cyan-400/40',
      border: 'border-blue-300/30',
      orbiting: ['from-blue-400 to-cyan-400', 'from-cyan-400 to-blue-500', 'from-blue-300 to-purple-400']
    },
    green: { 
      bg: 'from-emerald-200/40 via-emerald-300/40 to-teal-400/40',
      border: 'border-emerald-300/30',
      orbiting: ['from-green-400 to-emerald-400', 'from-emerald-400 to-green-500', 'from-green-300 to-teal-400']
    },
    yellow: { 
      bg: 'from-yellow-200/40 via-yellow-300/40 to-orange-400/40',
      border: 'border-yellow-300/30',
      orbiting: ['from-yellow-400 to-orange-400', 'from-orange-400 to-yellow-500', 'from-yellow-300 to-amber-400']
    },
    purple: { 
      bg: 'from-purple-200/40 via-purple-300/40 to-indigo-400/40',
      border: 'border-purple-300/30',
      orbiting: ['from-purple-400 to-pink-400', 'from-pink-400 to-purple-500', 'from-purple-300 to-indigo-400']
    },
    cyan: { 
      bg: 'from-cyan-200/40 via-cyan-300/40 to-blue-400/40',
      border: 'border-cyan-300/30',
      orbiting: ['from-cyan-400 to-blue-400', 'from-blue-400 to-cyan-500', 'from-cyan-300 to-teal-400']
    },
    orange: { 
      bg: 'from-orange-200/40 via-orange-300/40 to-red-400/40',
      border: 'border-orange-300/30',
      orbiting: ['from-orange-400 to-yellow-400', 'from-yellow-400 to-orange-500', 'from-orange-300 to-red-400']
    },
  }

  const colors = colorMap[color]

  return (
    <motion.div
      className={`relative ${className}`}
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
        className={`absolute -top-1 left-1/2 w-3 h-3 rounded-full bg-gradient-to-br ${colors.orbiting[0]} opacity-70`}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 80px" }}
      />
      <motion.div
        className={`absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-gradient-to-br ${colors.orbiting[1]} opacity-60`}
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "-60px 50%" }}
      />
      <motion.div
        className={`absolute -bottom-1 left-1/3 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${colors.orbiting[2]} opacity-50`}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "30px -70px" }}
      />

      {/* Main card with jelly wiggle effect */}
      <motion.div
        className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-2 bg-gradient-to-br ${colors.bg} ${colors.border} cursor-pointer`}
        onClick={onClick}
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
          scale: [1, 1.15, 0.9, 1.08, 0.95, 1],
          rotate: [0, -8, 6, -4, 2, 0],
          transition: {
            duration: 0.8,
            ease: "easeInOut",
            times: [0, 0.15, 0.35, 0.55, 0.75, 1]
          }
        }}
        whileTap={{
          scale: 0.9,
        }}
        style={{
          transformOrigin: "center center"
        }}
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

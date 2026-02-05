'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BubbleCardProps {
  children: ReactNode
  className?: string
  delay?: number
  color?: string
}

export function BubbleCard({ children, className = '', delay = 0, color = 'blue' }: BubbleCardProps) {
  const colorMap: Record<string, { bg: string, orbiting: string[], border: string }> = {
    blue: { 
      bg: 'from-blue-200/40 via-blue-300/40 to-cyan-400/40',
      orbiting: ['from-blue-400 to-cyan-400', 'from-cyan-400 to-blue-500', 'from-blue-300 to-purple-400'],
      border: 'border-blue-300/30'
    },
    purple: { 
      bg: 'from-purple-200/40 via-purple-300/40 to-indigo-400/40',
      orbiting: ['from-purple-400 to-pink-400', 'from-pink-400 to-purple-500', 'from-purple-300 to-indigo-400'],
      border: 'border-purple-300/30'
    },
    green: { 
      bg: 'from-emerald-200/40 via-emerald-300/40 to-teal-400/40',
      orbiting: ['from-green-400 to-emerald-400', 'from-emerald-400 to-green-500', 'from-green-300 to-teal-400'],
      border: 'border-emerald-300/30'
    },
    orange: { 
      bg: 'from-orange-200/40 via-orange-300/40 to-red-400/40',
      orbiting: ['from-orange-400 to-yellow-400', 'from-yellow-400 to-orange-500', 'from-orange-300 to-red-400'],
      border: 'border-orange-300/30'
    },
    pink: { 
      bg: 'from-pink-200/40 via-pink-300/40 to-purple-400/40',
      orbiting: ['from-pink-400 to-rose-400', 'from-rose-400 to-pink-500', 'from-pink-300 to-purple-400'],
      border: 'border-pink-300/30'
    },
    cyan: { 
      bg: 'from-cyan-200/40 via-cyan-300/40 to-blue-400/40',
      orbiting: ['from-cyan-400 to-blue-400', 'from-blue-400 to-cyan-500', 'from-cyan-300 to-teal-400'],
      border: 'border-cyan-300/30'
    },
    yellow: { 
      bg: 'from-yellow-200/40 via-yellow-300/40 to-orange-400/40',
      orbiting: ['from-yellow-400 to-orange-400', 'from-orange-400 to-yellow-500', 'from-yellow-300 to-amber-400'],
      border: 'border-yellow-300/30'
    },
  }

  const colors = colorMap[color]

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 100, damping: 12 }}
    >
      {/* Orbiting bubbles - similar to CircleBubble */}
      <motion.div
        className={`absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${colors.orbiting[0]} opacity-70`}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50% 100px" }}
      />
      <motion.div
        className={`absolute top-1/2 -right-3 w-3 h-3 rounded-full bg-gradient-to-br ${colors.orbiting[1]} opacity-60`}
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "-80px 50%" }}
      />
      <motion.div
        className={`absolute -bottom-2 left-1/3 w-3.5 h-3.5 rounded-full bg-gradient-to-br ${colors.orbiting[2]} opacity-60`}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "40px -90px" }}
      />
      
      {/* Additional floating bubbles */}
      <motion.div
        className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-white/40 opacity-60"
        animate={{
          y: [-3, 3],
          x: [-2, 2],
          scale: [1, 1.3],
        }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-white/30 opacity-50"
        animate={{
          y: [3, -3],
          x: [2, -2],
          scale: [1, 1.4],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
      />

      {/* Main card - Large circular shape */}
      <motion.div
        className={`relative rounded-full w-[380px] h-[380px] md:w-[420px] md:h-[420px] bg-gradient-to-br ${colors.bg} ${colors.border} border-2 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-2xl cursor-pointer`}
        animate={{
          y: [0, -8],
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
      >
        {/* Inner glow ring */}
        <motion.div
          className="absolute inset-6 rounded-full border border-white/30"
          animate={{
            scale: [1, 1.02],
            opacity: [0.3, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Gradient shine overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />

        {/* Second gradient layer for depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-transparent via-transparent to-black/10 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 py-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

interface BubbleBadgeProps {
  children: ReactNode
  delay?: number
}

export function BubbleBadge({ children, delay = 0 }: BubbleBadgeProps) {
  return (
    <motion.span
      className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 backdrop-blur-sm text-sm font-medium text-slate-700 dark:text-slate-300"
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.4, delay, type: "spring", stiffness: 200, damping: 10 }}
      whileHover={{ 
        scale: 1.15,
        rotate: 5,
        backgroundColor: "rgba(59, 130, 246, 0.4)",
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
      }}
    >
      {children}
    </motion.span>
  )
}

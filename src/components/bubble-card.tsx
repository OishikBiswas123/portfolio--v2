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
  const colorMap: Record<string, { bg: string, orbiting: string[] }> = {
    blue: { 
      bg: 'from-blue-400/20 to-blue-600/20 border-blue-400/30',
      orbiting: ['from-blue-400 to-cyan-400', 'from-cyan-400 to-blue-500', 'from-blue-300 to-purple-400']
    },
    purple: { 
      bg: 'from-purple-400/20 to-purple-600/20 border-purple-400/30',
      orbiting: ['from-purple-400 to-pink-400', 'from-pink-400 to-purple-500', 'from-purple-300 to-indigo-400']
    },
    green: { 
      bg: 'from-green-400/20 to-green-600/20 border-green-400/30',
      orbiting: ['from-green-400 to-emerald-400', 'from-emerald-400 to-green-500', 'from-green-300 to-teal-400']
    },
    orange: { 
      bg: 'from-orange-400/20 to-orange-600/20 border-orange-400/30',
      orbiting: ['from-orange-400 to-yellow-400', 'from-yellow-400 to-orange-500', 'from-orange-300 to-red-400']
    },
    pink: { 
      bg: 'from-pink-400/20 to-pink-600/20 border-pink-400/30',
      orbiting: ['from-pink-400 to-rose-400', 'from-rose-400 to-pink-500', 'from-pink-300 to-purple-400']
    },
    cyan: { 
      bg: 'from-cyan-400/20 to-cyan-600/20 border-cyan-400/30',
      orbiting: ['from-cyan-400 to-blue-400', 'from-blue-400 to-cyan-500', 'from-cyan-300 to-teal-400']
    },
    yellow: { 
      bg: 'from-yellow-400/20 to-yellow-600/20 border-yellow-400/30',
      orbiting: ['from-yellow-400 to-orange-400', 'from-orange-400 to-yellow-500', 'from-yellow-300 to-amber-400']
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
          y: [-3, 3, -3],
          x: [-2, 2, -2],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-white/30 opacity-50"
        animate={{
          y: [3, -3, 3],
          x: [2, -2, 2],
          scale: [1, 1.4, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Main card - Large circular shape */}
      <motion.div
        className={`relative rounded-full w-[380px] h-[380px] md:w-[420px] md:h-[420px] bg-gradient-to-br ${colors.bg} backdrop-blur-md border-2 transition-all duration-300 flex items-center justify-center overflow-hidden`}
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.03,
          rotate: [0, -2, 2, 0],
          boxShadow: `0 20px 50px -15px rgba(${color === 'blue' ? '59, 130, 246' : color === 'purple' ? '168, 85, 247' : color === 'green' ? '34, 197, 94' : color === 'orange' ? '249, 115, 22' : color === 'pink' ? '236, 72, 153' : color === 'cyan' ? '6, 182, 212' : '234, 179, 8'}, 0.4)`,
        }}
      >
        {/* Inner glow ring */}
        <motion.div
          className="absolute inset-6 rounded-full border border-white/20"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Inner gradient overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
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

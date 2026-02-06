'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function LetterHoverText({ text, className }: { text: string, className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <span className={`relative inline-flex ${className}`}>
      {/* Glitch layers - desktop only */}
      {!isMobile && (
        <>
          <motion.span 
            className="absolute inset-0 text-red-500 opacity-50 pointer-events-none select-none"
            animate={{ 
              x: [-2, 2, -2],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            aria-hidden
          >
            {text}
          </motion.span>
          <motion.span 
            className="absolute inset-0 text-blue-500 opacity-50 pointer-events-none select-none"
            animate={{ 
              x: [2, -2, 2],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 3,
              delay: 0.1
            }}
            aria-hidden
          >
            {text}
          </motion.span>
        </>
      )}
      
      {/* Main text with hover effect */}
      <motion.span
        className="relative z-10 inline-flex"
        animate={isMobile ? {} : { 
          textShadow: [
            "2px 0 #ef4444, -2px 0 #3b82f6",
            "-2px 0 #ef4444, 2px 0 #3b82f6",
            "2px 0 #ef4444, -2px 0 #3b82f6"
          ]
        }}
        transition={isMobile ? {} : { 
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 5
        }}
      >
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block cursor-pointer select-none"
            animate={{
              scale: hoveredIndex === index ? 1.5 : 1,
              y: hoveredIndex === index ? -10 : 0,
              color: hoveredIndex === index ? '#60a5fa' : 'inherit',
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              mass: 0.8
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onTouchStart={() => setHoveredIndex(index)}
            onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 300)}
            style={{ 
              display: 'inline-block',
              willChange: 'transform',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </span>
  )
}

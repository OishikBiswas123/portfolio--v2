'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function LetterHoverText({ text, className }: { text: string, className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <span className={`relative inline-flex ${className}`}>
      {/* Glitch layers - simplified on mobile */}
      <span 
        className="absolute inset-0 text-red-500 opacity-50 pointer-events-none select-none hidden md:block"
        style={{
          transform: 'translateX(-2px)',
        }}
        aria-hidden
      >
        {text}
      </span>
      <span 
        className="absolute inset-0 text-blue-500 opacity-50 pointer-events-none select-none hidden md:block"
        style={{
          transform: 'translateX(2px)',
        }}
        aria-hidden
      >
        {text}
      </span>
      
      {/* Main text with hover effect */}
      <motion.span
        className="relative z-10 inline-flex"
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

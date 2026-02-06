'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'

export function LetterHoverText({ text, className }: { text: string, className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)
  const isTouchingRef = useRef(false)

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isTouchingRef.current || !containerRef.current) return
    
    const touch = e.touches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    
    // Find the closest letter span
    const letterSpan = element?.closest('[data-letter-index]')
    if (letterSpan) {
      const index = parseInt(letterSpan.getAttribute('data-letter-index') || '-1')
      if (index !== -1) {
        setHoveredIndex(index)
      }
    }
  }, [])

  const handleTouchStart = () => {
    isTouchingRef.current = true
  }

  const handleTouchEnd = () => {
    isTouchingRef.current = false
    setTimeout(() => setHoveredIndex(null), 300)
  }

  return (
    <span className={`relative inline-flex ${className}`} ref={containerRef}>
      {/* Glitch layers */}
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
      
      {/* Main text with hover effect */}
      <motion.span
        className="relative z-10 inline-flex touch-none"
        animate={{ 
          textShadow: [
            "2px 0 #ef4444, -2px 0 #3b82f6",
            "-2px 0 #ef4444, 2px 0 #3b82f6",
            "2px 0 #ef4444, -2px 0 #3b82f6"
          ]
        }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 5
        }}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {text.split('').map((letter, index) => (
          <motion.span
            key={index}
            data-letter-index={index}
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
            onTouchStart={(e) => {
              e.stopPropagation()
              setHoveredIndex(index)
            }}
            style={{ 
              display: 'inline-block',
              willChange: 'transform'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </span>
  )
}

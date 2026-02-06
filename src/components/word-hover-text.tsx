'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'

export function WordHoverText({ text, className }: { text: string, className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)
  const isTouchingRef = useRef(false)
  const words = text.split(' ')

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isTouchingRef.current || !containerRef.current) return
    
    const touch = e.touches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    
    // Find the closest word span
    const wordSpan = element?.closest('[data-word-index]')
    if (wordSpan) {
      const index = parseInt(wordSpan.getAttribute('data-word-index') || '-1')
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
    <span 
      className={`inline-flex flex-wrap justify-center gap-x-2 ${className}`}
      ref={containerRef}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          data-word-index={index}
          className="inline-block cursor-pointer select-none"
          animate={{
            scale: hoveredIndex === index ? 1.2 : 1,
            y: hoveredIndex === index ? -5 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchStart={(e) => {
            e.stopPropagation()
            setHoveredIndex(index)
          }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

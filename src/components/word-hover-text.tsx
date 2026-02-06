'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function WordHoverText({ text, className }: { text: string, className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
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
          onTouchStart={() => setHoveredIndex(index)}
          onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 300)}
          style={{ 
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Tech icons as SVG paths
const techIcons = [
  { type: 'brackets', path: '<>' },
  { type: 'slash', path: '//' },
  { type: 'hash', path: '{}' },
  { type: 'code', path: '</>' },
  { type: 'terminal', path: '>_' },
  { type: 'binary', path: '01' },
  { type: 'asterisk', path: '**' },
  { type: 'arrow', path: '=>' },
  { type: 'function', path: '()' },
  { type: 'array', path: '[]' },
]

interface FloatingIcon {
  id: number
  text: string
  type: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
  rotate: number
}

export function FloatingTechIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    // Check if mobile
    const isMobile = window.innerWidth < 768
    
    const shuffled = [...techIcons].sort(() => 0.5 - Math.random())
    // Fewer icons on mobile
    const iconCount = isMobile ? 6 : 15
    const selectedIcons = shuffled.slice(0, iconCount)
    
    const floatingIcons = selectedIcons.map((icon, index) => ({
      id: index,
      text: icon.path,
      type: icon.type,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: isMobile ? Math.random() * 1 + 0.8 : Math.random() * 1.5 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 2,
      rotate: Math.random() * 360,
    }))
    
    setIcons(floatingIcons)
  }, [])

  if (icons.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute font-mono font-bold text-slate-600/50 dark:text-slate-300/50 select-none"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}rem`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            y: [0, -30, 0],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            delay: icon.delay,
            ease: "easeInOut",
          }}
        >
          {icon.text}
        </motion.div>
      ))}
    </div>
  )
}

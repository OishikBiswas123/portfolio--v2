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
  { type: 'circuit', path: '||' },
  { type: 'arrow', path: '=>' },
  { type: 'function', path: '()' },
  { type: 'array', path: '[]' },
  { type: 'module', path: '::' },
  { type: 'comment', path: '/*' },
  { type: 'variable', path: '$_' },
  { type: 'command', path: '$>' },
  { type: 'tag', path: '</>' },
  { type: 'link', path: '-->' },
  { type: 'node', path: '(.)' },
  { type: 'cloud', path: '{}' },
  { type: 'api', path: 'API' },
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = window.innerWidth < 768
    setIsMobile(checkMobile)
    
    const shuffled = [...techIcons].sort(() => 0.5 - Math.random())
    // Fewer icons on mobile, full on desktop
    const iconCount = checkMobile ? 6 : 30
    const selectedIcons = [...shuffled, ...shuffled].slice(0, iconCount)
    
    const floatingIcons = selectedIcons.map((icon, index) => ({
      id: index,
      text: icon.path,
      type: icon.type,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: checkMobile ? Math.random() * 1 + 0.8 : Math.random() * 2 + 1.5,
      duration: checkMobile ? Math.random() * 8 + 6 : Math.random() * 15 + 10,
      delay: Math.random() * (checkMobile ? 2 : 3),
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
          className="absolute font-mono font-bold text-slate-600/70 dark:text-slate-300/70 select-none"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}rem`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [0.9, 1.3, 0.9],
            rotate: isMobile ? [icon.rotate, icon.rotate] : [icon.rotate, icon.rotate + 20, icon.rotate],
            y: [0, isMobile ? -30 : -50, 0],
            x: [0, isMobile ? 0 : (Math.random() * 40 - 20), 0],
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

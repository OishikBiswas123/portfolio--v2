'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Tech icons as SVG paths
const techIcons = [
  { type: 'brackets', path: '<>' },
  { type: 'slash', path: '//' },
  { type: 'hash', path: '{}' },
  { type: 'code', path: '</>' },
  { type: 'terminal', path: '>_ ' },
  { type: 'binary', path: '01' },
  { type: 'asterisk', path: '**' },
  { type: 'circuit', path: '&#124;&#124;' },
  { type: 'arrow', path: '=>' },
  { type: 'function', path: '()' },
  { type: 'array', path: '[]' },
  { type: 'module', path: '::' },
  { type: 'comment', path: '/*' },
  { type: 'variable', path: '$_' },
  { type: 'command', path: '$>' },
  { type: 'tag', path: '<&#47;>' },
  { type: 'link', path: '-->' },
  { type: 'node', path: '(.)' },
  { type: 'cloud', path: '&#123;&#125;' },
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

  useEffect(() => {
    const shuffled = [...techIcons].sort(() => 0.5 - Math.random())
    const selectedIcons = [...shuffled, ...shuffled].slice(0, 30)
    
    const floatingIcons = selectedIcons.map((icon, index) => ({
      id: index,
      text: icon.path,
      type: icon.type,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1.5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 3,
      rotate: Math.random() * 360,
    }))
    
    setIcons(floatingIcons)
  }, [])

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
            rotate: [icon.rotate, icon.rotate + 20, icon.rotate],
            y: [0, -50, 0],
            x: [0, Math.random() * 40 - 20, 0],
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

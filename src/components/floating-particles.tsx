'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = window.innerWidth < 768
    setIsMobile(checkMobile)
    
    const colors = [
      'from-blue-400 to-cyan-400',
      'from-purple-400 to-pink-400', 
      'from-green-400 to-emerald-400',
      'from-yellow-400 to-orange-400',
      'from-pink-400 to-rose-400',
      'from-cyan-400 to-blue-400',
    ]
    
    // Full particles on desktop, fewer on mobile
    const particleCount = checkMobile ? 20 : 150
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: checkMobile ? Math.random() * 4 + 1 : Math.random() * 6 + 2,
      duration: checkMobile ? Math.random() * 10 + 6 : Math.random() * 15 + 8,
      delay: Math.random() * (checkMobile ? 5 : 8),
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-br ${particle.color}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: isMobile ? 'none' : `0 0 ${particle.size * 3}px rgba(255, 255, 255, 0.4)`,
          }}
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{
            y: [0, isMobile ? -50 : -100, 0],
            x: [0, isMobile ? 0 : (index % 2 === 0 ? 30 : -30), 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

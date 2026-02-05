'use client'

import { motion } from 'framer-motion'

interface FloatingBallsProps {
  count?: number
  color?: string
}

export function FloatingBallsAround({ count = 20, color = 'blue' }: FloatingBallsProps) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-400/60 to-cyan-400/60',
    purple: 'from-purple-400/60 to-pink-400/60',
    green: 'from-green-400/60 to-emerald-400/60',
    orange: 'from-orange-400/60 to-yellow-400/60',
    pink: 'from-pink-400/60 to-rose-400/60',
    cyan: 'from-cyan-400/60 to-blue-400/60',
  }

  const balls = Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i / count) * 360,
    distance: 180 + Math.random() * 100,
    size: 4 + Math.random() * 8,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {balls.map((ball) => {
        const rad = (ball.angle * Math.PI) / 180
        const x = Math.cos(rad) * ball.distance
        const y = Math.sin(rad) * ball.distance

        return (
          <motion.div
            key={ball.id}
            className={`absolute rounded-full bg-gradient-to-br ${colorMap[color]} left-1/2 top-1/2`}
            style={{
              width: ball.size,
              height: ball.size,
              marginLeft: -ball.size / 2,
              marginTop: -ball.size / 2,
              boxShadow: `0 0 ${ball.size * 2}px rgba(255, 255, 255, 0.5)`,
            }}
            initial={{ x, y, opacity: 0, scale: 0 }}
            animate={{
              x: [x, x + Math.random() * 40 - 20, x],
              y: [y, y + Math.random() * 40 - 20, y],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: ball.duration,
              repeat: Infinity,
              delay: ball.delay,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedText({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) {
  const words = text.split(' ')
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay
      }
    }
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-2 inline-block"
          variants={child}
          style={{ perspective: '1000px' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function GlitchText({ text, className }: { text: string, className?: string }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="relative z-10"
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
      >
        {text}
      </motion.h1>
      
      {/* Glitch Layers */}
      <motion.span 
        className="absolute inset-0 text-red-500 opacity-50"
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
        className="absolute inset-0 text-blue-500 opacity-50"
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
    </motion.div>
  )
}

export function TypewriterText({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex])
          setCurrentIndex(prev => prev + 1)
        }, 15)
        return () => clearTimeout(timeout)
      }
    }, delay * 1000)

    return () => clearTimeout(startTimeout)
  }, [currentIndex, text, delay])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        className="inline-block w-0.5 h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  )
}
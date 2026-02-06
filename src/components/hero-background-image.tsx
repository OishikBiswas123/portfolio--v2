'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function HeroBackgroundImage() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'
  
  return (
    <motion.div 
      className="absolute right-0 top-0 h-full w-2/5 z-0 pointer-events-none"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={isDark ? 'dark' : 'light'}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: isDark ? 'url(/hero-bg-dark.png)' : 'url(/hero-bg.png)',
            opacity: isDark ? 0.55 : 0.5,
            transform: isDark ? 'scaleX(-1)' : 'none',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isDark ? 0.55 : 0.5, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>
      
      {/* Edge mask for dark mode to blend photo edges */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
      </div>
      
      {/* Gradient overlay for better text readability - left fade */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-slate-50/90 dark:to-slate-900/90" />
      
      {/* Top to bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 dark:from-slate-900/20 via-transparent to-slate-50/80 dark:to-slate-900/80" />
    </motion.div>
  )
}
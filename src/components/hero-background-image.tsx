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
    <>
      {/* Desktop: Right side background - HIDDEN ON MOBILE */}
      <motion.div 
        className="hidden md:block absolute right-0 top-0 h-full w-2/5 z-0 pointer-events-none"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={isDark ? 'dark' : 'light'}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div 
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${isDark ? 'scale-x-[-1]' : ''}`}
              style={{
                backgroundImage: isDark ? 'url(/hero-bg-dark.png)' : 'url(/hero-bg.png)',
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 dark:from-slate-900/80 via-slate-50/30 dark:via-slate-900/30 to-transparent" />
      </motion.div>

      {/* Mobile: Bottom center background - HIDDEN ON DESKTOP */}
      <motion.div 
        className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-[130%] h-[65%] z-0 pointer-events-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={isDark ? 'dark' : 'light'}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div 
              className={`absolute inset-0 bg-contain bg-bottom bg-no-repeat ${isDark ? 'scale-x-[-1]' : ''}`}
              style={{
                backgroundImage: isDark ? 'url(/hero-bg-dark.png)' : 'url(/hero-bg.png)',
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient overlay for better text readability - left to right fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/60 dark:from-slate-900/60 via-transparent to-transparent" />
      </motion.div>
    </>
  )
}

'use client'

import { motion } from 'framer-motion'

export function HeroBackgroundImage() {
  return (
    <motion.div 
      className="absolute right-0 top-0 h-full w-2/5 z-0 pointer-events-none"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          opacity: 0.5,
        }}
      />
      {/* Gradient overlay for better text readability - left fade */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-slate-50/90 dark:to-slate-900/90" />
      
      {/* Top to bottom fade - more visible at top, fade out at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 dark:from-slate-900/20 via-transparent to-slate-50/80 dark:to-slate-900/80" />
    </motion.div>
  )
}
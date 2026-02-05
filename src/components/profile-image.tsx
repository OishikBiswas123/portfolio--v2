'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function ProfileImage() {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {/* Outer Glow Ring */}
      <motion.div 
        className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-xl"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Secondary Glow */}
      <motion.div 
        className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-md"
        animate={{ 
          rotate: [360, 0],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Profile Container */}
      <motion.div 
        className="relative w-64 h-64 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 dark:border-slate-700/50"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {!imageError ? (
          <img 
            src="/profile.jpg" 
            alt="Oishik Biswas"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
            OB
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </motion.div>

      {/* Corner Decorations */}
      <motion.div 
        className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-blue-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-purple-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div 
        className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-pink-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      />
    </motion.div>
  )
}
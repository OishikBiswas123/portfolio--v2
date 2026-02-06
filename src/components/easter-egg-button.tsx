'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function EasterEggButton() {
  const [clicks, setClicks] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(false)

  const handleClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)
    
    if (newClicks === 5) {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
    }
    
    if (newClicks === 10) {
      setSecretUnlocked(true)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: -60, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg shadow-lg whitespace-nowrap"
          >
            🎉 Keep clicking... something cool might happen!
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={handleClick}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
          secretUnlocked 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/50' 
            : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={secretUnlocked ? "You've unlocked the secret! 🎉" : "Click me... if you dare! 👀"}
      >
        {secretUnlocked ? '🦄' : '🥚'}
      </motion.button>
      
      <AnimatePresence>
        {secretUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-full right-0 mb-14 w-64 p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl shadow-2xl"
          >
            <h3 className="text-white font-bold text-lg mb-2">🎊 Easter Egg Unlocked!</h3>
            <p className="text-white/90 text-sm">
              Hey there, curious developer! You found the secret button. 
              Fun fact: You clicked it {clicks} times! Keep building awesome things! 🚀
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

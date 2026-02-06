'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpaceWarGame } from './space-war-game'

export function EasterEggButton() {
  const [clicks, setClicks] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [gameUnlocked, setGameUnlocked] = useState(false)
  const [showGame, setShowGame] = useState(false)

  const handleClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)
    
    if (newClicks === 5) {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
    }
    
    if (newClicks === 7) {
      setGameUnlocked(true)
      setShowGame(true)
    }
  }

  const closeGame = () => {
    setShowGame(false)
  }

  return (
    <>
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
            gameUnlocked 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-purple-500/50' 
              : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={gameUnlocked ? "Game unlocked! 🎮 Click to play!" : "Click me... if you dare! 👀"}
        >
          {gameUnlocked ? '🎮' : '🥚'}
        </motion.button>
        
        <AnimatePresence>
          {gameUnlocked && !showGame && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute bottom-full right-0 mb-14 w-64 p-4 bg-gradient-to-br from-cyan-600 via-purple-500 to-pink-400 rounded-xl shadow-2xl"
            >
              <h3 className="text-white font-bold text-lg mb-2">🎮 GAME UNLOCKED!</h3>
              <p className="text-white/90 text-sm mb-3">
                You found the secret! Click the button again to play Space War!
              </p>
              <motion.button
                onClick={() => setShowGame(true)}
                className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-bold text-sm transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                PLAY NOW 🚀
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SpaceWarGame isOpen={showGame} onClose={closeGame} />
    </>
  )
}

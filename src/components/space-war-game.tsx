'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Bullet {
  id: number
  x: number
  y: number
}

interface Enemy {
  id: number
  x: number
  y: number
  speed: number
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

interface SpaceWarGameProps {
  isOpen: boolean
  onClose: () => void
}

export function SpaceWarGame({ isOpen, onClose }: SpaceWarGameProps) {
  const [gameState, setGameState] = useState<'playing' | 'gameOver' | 'victory'>('playing')
  const [score, setScore] = useState(0)
  const [playerX, setPlayerX] = useState(50) // percentage
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [enemies, setEnemies] = useState<Enemy[]>([])
  const [stars, setStars] = useState<Star[]>([])
  const [lives, setLives] = useState(3)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const bulletIdRef = useRef(0)
  const enemyIdRef = useRef(0)
  const starIdRef = useRef(0)
  const keysRef = useRef<{ [key: string]: boolean }>({})

  // Initialize stars background
  useEffect(() => {
    if (!isOpen) return
    const initialStars: Star[] = []
    for (let i = 0; i < 50; i++) {
      initialStars.push({
        id: starIdRef.current++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1
      })
    }
    setStars(initialStars)
  }, [isOpen])

  // Shoot function - defined early to avoid dependency issues
  const shoot = useCallback(() => {
    setBullets(prev => [...prev, {
      id: bulletIdRef.current++,
      x: playerX,
      y: 85
    }])
  }, [playerX])

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault()
        shoot()
      }
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isOpen, shoot])

  // Game loop
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return
    
    const gameLoop = setInterval(() => {
      // Move player
      if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) {
        setPlayerX(prev => Math.max(5, prev - 2))
      }
      if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) {
        setPlayerX(prev => Math.min(95, prev + 2))
      }
      
      // Move bullets
      setBullets(prev => 
        prev.map(b => ({ ...b, y: b.y - 5 })).filter(b => b.y > -5)
      )
      
      // Move enemies and check player collision
      setEnemies(prev => {
        const moved = prev.map(e => ({ ...e, y: e.y + e.speed }))
        const filtered = moved.filter(e => e.y < 105)
        
        // Check collision with player
        const hitPlayerIndex = filtered.findIndex(e => 
          Math.abs(e.x - playerX) < 8 && e.y > 85
        )
        
        if (hitPlayerIndex !== -1) {
          setLives(l => {
            const newLives = l - 1
            if (newLives <= 0) {
              setGameState('gameOver')
            }
            return newLives
          })
          filtered.splice(hitPlayerIndex, 1)
        }
        
        return filtered
      })
      
      // Move stars
      setStars(prev => 
        prev.map(s => ({ ...s, y: s.y + s.speed })).map(s => 
          s.y > 100 ? { ...s, y: 0, x: Math.random() * 100 } : s
        )
      )
      
      // Spawn enemies
      if (Math.random() < 0.03) {
        setEnemies(prev => [...prev, {
          id: enemyIdRef.current++,
          x: Math.random() * 90 + 5,
          y: -5,
          speed: Math.random() * 1.5 + 0.5
        }])
      }
    }, 50)
    
    return () => clearInterval(gameLoop)
  }, [isOpen, gameState, playerX])

  // Check bullet-enemy collisions and victory in game loop
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return
    
    const collisionCheck = setInterval(() => {
      setBullets(prevBullets => {
        const remainingBullets: Bullet[] = []
        let hitCount = 0
        
        // Get current enemies state
        setEnemies(prevEnemies => {
          const remainingEnemies = [...prevEnemies]
          
          for (const bullet of prevBullets) {
            const hitIndex = remainingEnemies.findIndex(enemy => 
              Math.abs(enemy.x - bullet.x) < 6 && Math.abs(enemy.y - bullet.y) < 6
            )
            
            if (hitIndex !== -1) {
              remainingEnemies.splice(hitIndex, 1)
              hitCount++
            } else {
              remainingBullets.push(bullet)
            }
          }
          
          return remainingEnemies
        })
        
        if (hitCount > 0) {
          setScore(s => s + hitCount * 100)
        }
        
        return remainingBullets
      })
      
      // Check victory
      setScore(currentScore => {
        if (currentScore >= 5000) {
          setGameState('victory')
        }
        return currentScore
      })
    }, 50)
    
    return () => clearInterval(collisionCheck)
  }, [isOpen, gameState])

  const restartGame = () => {
    setGameState('playing')
    setScore(0)
    setLives(3)
    setBullets([])
    setEnemies([])
    setPlayerX(50)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Game container */}
      <div 
        ref={gameAreaRef}
        className="relative w-full max-w-4xl aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20"
      >
        {/* Stars background */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}

        {/* HUD */}
        <div className="absolute top-4 left-4 right-4 flex justify-between text-white font-mono z-20">
          <div className="flex gap-4">
            <span className="text-yellow-400">SCORE: {score}</span>
            <span className="text-red-400">LIVES: {'❤️'.repeat(lives)}</span>
          </div>
          <span className="text-purple-400">TARGET: 5000</span>
        </div>

        {/* Instructions */}
        {gameState === 'playing' && score === 0 && bullets.length === 0 && enemies.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4 text-purple-400">SPACE WAR</h2>
              <p className="text-lg mb-2">Use ← → or A D to move</p>
              <p className="text-lg mb-4">Press SPACE to shoot</p>
              <p className="text-sm text-slate-400">Destroy enemies and reach 5000 points!</p>
              <motion.button
                onClick={shoot}
                className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                START GAME
              </motion.button>
            </div>
          </div>
        )}

        {/* Player ship */}
        <motion.div
          className="absolute bottom-8 w-0 h-0"
          style={{ left: `${playerX}%`, x: '-50%' }}
          animate={{ left: `${playerX}%` }}
          transition={{ type: 'tween', duration: 0.1 }}
        >
          <div className="relative">
            {/* Ship body */}
            <div className="absolute -left-3 -top-6 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-cyan-500" />
            {/* Engine flame */}
            <motion.div
              className="absolute -left-1 top-2 w-2 h-4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full"
              animate={{ scaleY: [1, 1.3, 1] }}
              transition={{ duration: 0.1, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Bullets */}
        {bullets.map(bullet => (
          <motion.div
            key={bullet.id}
            className="absolute w-1 h-4 bg-gradient-to-t from-green-400 to-green-300 rounded-full shadow-lg shadow-green-400/50"
            style={{ 
              left: `${bullet.x}%`, 
              top: `${bullet.y}%`,
              transform: 'translateX(-50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        ))}

        {/* Enemies */}
        {enemies.map(enemy => (
          <motion.div
            key={enemy.id}
            className="absolute"
            style={{ 
              left: `${enemy.x}%`, 
              top: `${enemy.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {/* Enemy ship */}
            <div className="relative">
              <div className="w-8 h-6 bg-gradient-to-b from-red-500 to-red-700 rounded-t-full" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full animate-pulse" />
              {/* Wings */}
              <div className="absolute top-1 -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-red-600" />
              <div className="absolute top-1 -right-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-red-600" />
            </div>
          </motion.div>
        ))}

        {/* Game Over Screen */}
        <AnimatePresence>
          {gameState === 'gameOver' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center z-40 bg-black/80"
            >
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold mb-4 text-red-500">GAME OVER</h2>
                <p className="text-2xl mb-2">Final Score: {score}</p>
                <p className="text-lg text-slate-400 mb-6">Better luck next time, space warrior!</p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={restartGame}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    TRY AGAIN
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    EXIT
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Victory Screen */}
        <AnimatePresence>
          {gameState === 'victory' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center z-40 bg-gradient-to-br from-purple-900/90 to-blue-900/90"
            >
              <div className="text-center text-white">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-6xl mb-4"
                >
                  🏆
                </motion.div>
                <h2 className="text-5xl font-bold mb-4 text-yellow-400">VICTORY!</h2>
                <p className="text-2xl mb-2">Score: {score}</p>
                <p className="text-lg text-slate-300 mb-6">You conquered the galaxy!</p>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={restartGame}
                    className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    PLAY AGAIN
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    EXIT
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

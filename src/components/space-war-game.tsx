'use client'

import { useState, useEffect, useCallback, useRef, memo } from 'react'
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

interface SpaceWarGameProps {
  isOpen: boolean
  onClose: () => void
}

// Static star background - generated once
const STATIC_STARS = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.5 + 0.3
}))

// Memoized game entities to prevent unnecessary re-renders
const BulletComponent = memo(({ bullet }: { bullet: Bullet }) => (
  <div
    className="absolute w-1 h-4 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
    style={{ 
      left: `${bullet.x}%`, 
      top: `${bullet.y}%`,
      transform: 'translateX(-50%)'
    }}
  />
))
BulletComponent.displayName = 'BulletComponent'

const EnemyComponent = memo(({ enemy }: { enemy: Enemy }) => (
  <div
    className="absolute"
    style={{ 
      left: `${enemy.x}%`, 
      top: `${enemy.y}%`,
      transform: 'translate(-50%, -50%)'
    }}
  >
    <div className="w-8 h-6 bg-gradient-to-b from-red-500 to-red-700 rounded-t-full" />
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full animate-pulse" />
    <div className="absolute top-1 -left-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-red-600" />
    <div className="absolute top-1 -right-2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-red-600" />
  </div>
))
EnemyComponent.displayName = 'EnemyComponent'

export function SpaceWarGame({ isOpen, onClose }: SpaceWarGameProps) {
  const [gameState, setGameState] = useState<'playing' | 'gameOver' | 'victory'>('playing')
  const [score, setScore] = useState(0)
  const [playerX, setPlayerX] = useState(50)
  const [bullets, setBullets] = useState<Bullet[]>([])
  const [enemies, setEnemies] = useState<Enemy[]>([])
  const [lives, setLives] = useState(3)
  
  const bulletIdRef = useRef(0)
  const enemyIdRef = useRef(0)
  const keysRef = useRef<{ [key: string]: boolean }>({})
  const scoreRef = useRef(0)
  const playerXRef = useRef(50)
  const gameStateRef = useRef(gameState)
  
  // Keep refs in sync
  useEffect(() => {
    scoreRef.current = score
    playerXRef.current = playerX
    gameStateRef.current = gameState
  }, [score, playerX, gameState])

  const getBulletId = () => {
    bulletIdRef.current += 1
    return Date.now() + bulletIdRef.current
  }
  const getEnemyId = () => {
    enemyIdRef.current += 1
    return Date.now() + 10000000 + enemyIdRef.current
  }

  const shoot = useCallback(() => {
    const newBullet: Bullet = {
      id: getBulletId(),
      x: playerXRef.current,
      y: 85
    }
    setBullets(prev => [...prev, newBullet])
  }, [])

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

  // Single optimized game loop using requestAnimationFrame
  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return
    
    let animationId: number
    let lastTime = performance.now()
    
    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      
      // Run at ~20fps for better performance (50ms)
      if (deltaTime >= 50) {
        lastTime = currentTime
        
        // Move player
        if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) {
          const newX = Math.max(5, playerXRef.current - 3)
          playerXRef.current = newX
          setPlayerX(newX)
        }
        if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) {
          const newX = Math.min(95, playerXRef.current + 3)
          playerXRef.current = newX
          setPlayerX(newX)
        }
        
        // Move bullets and check collisions in one pass
        setBullets(prevBullets => {
          const movedBullets = prevBullets.map(b => ({ ...b, y: b.y - 6 })).filter(b => b.y > -5)
          
          // Check collisions
          let hitCount = 0
          setEnemies(prevEnemies => {
            const remainingEnemies = [...prevEnemies]
            const remainingBullets: Bullet[] = []
            
            for (const bullet of movedBullets) {
              const hitIndex = remainingEnemies.findIndex(enemy => 
                Math.abs(enemy.x - bullet.x) < 7 && Math.abs(enemy.y - bullet.y) < 7
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
            const newScore = scoreRef.current + hitCount * 100
            scoreRef.current = newScore
            setScore(newScore)
            
            if (newScore >= 5000) {
              setGameState('victory')
            }
          }
          
          return hitCount > 0 ? remainingBullets : movedBullets
        })
        
        // Move enemies and check player collision
        setEnemies(prev => {
          const moved = prev.map(e => ({ ...e, y: e.y + e.speed }))
          const filtered = moved.filter(e => e.y < 105)
          
          const hitPlayerIndex = filtered.findIndex(e => 
            Math.abs(e.x - playerXRef.current) < 8 && e.y > 85
          )
          
          if (hitPlayerIndex !== -1) {
            filtered.splice(hitPlayerIndex, 1)
            setLives(l => {
              const newLives = Math.max(0, l - 1)
              if (newLives <= 0) {
                setGameState('gameOver')
              }
              return newLives
            })
          }
          
          return filtered
        })
        
        // Spawn enemies (reduced spawn rate)
        if (Math.random() < 0.025) {
          setEnemies(prev => [...prev, {
            id: getEnemyId(),
            x: Math.random() * 90 + 5,
            y: -5,
            speed: Math.random() * 1.2 + 0.5
          }])
        }
      }
      
      animationId = requestAnimationFrame(gameLoop)
    }
    
    animationId = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animationId)
  }, [isOpen, gameState])

  const restartGame = () => {
    setGameState('playing')
    setScore(0)
    scoreRef.current = 0
    setLives(3)
    setBullets([])
    setEnemies([])
    setPlayerX(50)
    playerXRef.current = 50
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-4xl aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20">
        {/* Static stars background */}
        <div className="absolute inset-0">
          {STATIC_STARS.map(star => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity
              }}
            />
          ))}
        </div>

        {/* HUD */}
        <div className="absolute top-4 left-4 right-4 flex justify-between text-white font-mono z-20">
          <div className="flex gap-4">
            <span className="text-yellow-400">SCORE: {score}</span>
            <span className="text-red-400">LIVES: {'❤️'.repeat(Math.max(0, lives))}</span>
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
              <button
                onClick={shoot}
                className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-transform hover:scale-105 active:scale-95"
              >
                START GAME
              </button>
            </div>
          </div>
        )}

        {/* Player ship - using transform for smooth movement */}
        <div
          className="absolute bottom-8 transition-transform duration-75 ease-linear"
          style={{ 
            left: `${playerX}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="relative">
            <div className="absolute -left-3 -top-6 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-cyan-500" />
            <div className="absolute -left-1 top-2 w-2 h-4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Bullets - memoized */}
        {bullets.map(bullet => (
          <BulletComponent key={bullet.id} bullet={bullet} />
        ))}

        {/* Enemies - memoized */}
        {enemies.map(enemy => (
          <EnemyComponent key={enemy.id} enemy={enemy} />
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
                  <button
                    onClick={restartGame}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    TRY AGAIN
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    EXIT
                  </button>
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
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-5xl font-bold mb-4 text-yellow-400">VICTORY!</h2>
                <p className="text-2xl mb-2">Score: {score}</p>
                <p className="text-lg text-slate-300 mb-6">You conquered the galaxy!</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={restartGame}
                    className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold text-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    PLAY AGAIN
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-bold text-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    EXIT
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

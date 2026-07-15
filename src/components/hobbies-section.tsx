"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Music, Mic, Headphones, Film, Play, Pause } from "lucide-react"

const audioCards = [
  { key: "guitar", icon: Music, label: "Playing Guitar", src: "/guitar.ogg" },
  { key: "singing", icon: Mic, label: "Singing", src: "/singing.ogg" },
  { key: "beatbox", icon: Headphones, label: "Beatboxing", src: "/beatbox.ogg" },
] as const

export function HobbiesSection({ stopKey = 0, onPlay }: { stopKey?: number; onPlay?: () => void }) {
  const router = useRouter()
  const [playing, setPlaying] = useState<string | null>(null)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const currentAudio = useRef<HTMLAudioElement | null>(null)

  const stopAudio = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause()
      currentAudio.current = null
    }
    setPlaying(null)
    setPaused(false)
    setProgress(0)
  }, [])

  useEffect(() => {
    stopAudio()
  }, [stopKey, stopAudio])

  const togglePlay = useCallback((key: string, src: string) => {
    if (playing === key) {
      if (currentAudio.current) {
        if (currentAudio.current.paused) {
          currentAudio.current.play()
          setPaused(false)
        } else {
          currentAudio.current.pause()
          setPaused(true)
        }
      }
      return
    }

    if (currentAudio.current) {
      currentAudio.current.pause()
      currentAudio.current = null
    }

    const audio = new Audio(src)
    currentAudio.current = audio
    setProgress(0)
    setPaused(false)

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    audio.addEventListener("timeupdate", onTimeUpdate)

    audio.addEventListener("ended", () => {
      setPlaying(null)
      setPaused(false)
      setProgress(0)
      currentAudio.current = null
    })

    audio.addEventListener("error", () => {
      setPlaying(null)
      setPaused(false)
      setProgress(0)
      currentAudio.current = null
    })

    audio.play().then(() => {
      setPlaying(key)
      onPlay?.()
    }).catch(() => {
      setPlaying(null)
    })
  }, [playing, onPlay])

  useEffect(() => {
    return () => {
      if (currentAudio.current) {
        currentAudio.current.pause()
        currentAudio.current = null
      }
    }
  }, [])

  return (
    <section className="py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto font-semibold">
            Beyond visuals and code, this is where I express myself through music, rhythm, and sound.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 sm:gap-10 items-stretch">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 sm:h-[480px]"
            style={{ gridTemplateRows: "1fr 1fr" }}
          >
            {audioCards.map((card) => {
              const Icon = card.icon
              const isActive = playing === card.key
              const isPaused = isActive && paused

              return (
                <motion.div
                  key={card.key}
                  className="flex flex-col items-center justify-center gap-4 p-8 sm:p-10 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl h-full transition-colors hover:bg-white/[15] hover:border-white/40"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    whileHover={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={32} className="text-text-primary" />
                  </motion.div>
                  <p className="text-sm font-semibold text-text-primary">
                    {card.label}
                  </p>

                  <div className="flex items-center gap-3 w-full max-w-[200px]">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePlay(card.key, card.src)
                      }}
                      className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/20 transition-all text-text-primary"
                      whileTap={{ scale: 0.9 }}
                    >
                      {isActive && !isPaused ? (
                        <Pause size={14} fill="currentColor" />
                      ) : (
                        <Play size={14} fill="currentColor" className="ml-0.5" />
                      )}
                    </motion.button>

                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-text-primary rounded-full"
                        animate={{ width: isActive ? `${progress}%` : "0%" }}
                        transition={{ duration: isActive ? 0.3 : 0, ease: "linear" }}
                      />
                    </div>
                  </div>

                  {isActive && (
                    <p className="text-[10px] uppercase tracking-wider text-text-muted">
                      {isPaused ? "Paused" : "Playing..."}
                    </p>
                  )}
                </motion.div>
              )
            })}

            <motion.div
              className="flex flex-col items-center justify-center gap-4 p-8 sm:p-10 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl h-full transition-colors hover:bg-white/[15] hover:border-white/40"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                whileHover={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.4 }}
              >
                <Film size={32} className="text-text-primary" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-semibold text-text-primary">
                  Moments That Move
                </p>
                <p className="mt-1.5 text-xs text-text-secondary leading-relaxed max-w-[200px]">
                  A gallery of performances, memories, and expressions captured over time.
                </p>
              </div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/gallery")
                }}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-text-primary bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 border border-white/20 rounded-full px-4 py-2 transition-all"
                whileHover={{ gap: "10px" }}
              >
                View Gallery →
              </motion.button>
            </motion.div>
          </div>

          <div className="flex items-center justify-center mt-8 lg:mt-0">
            <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight text-text-primary leading-[0.9] text-center lg:text-left">
              Hear<br />My<br />Creativity
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

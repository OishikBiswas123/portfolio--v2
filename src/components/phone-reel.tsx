"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Lock } from "lucide-react"

interface VideoItem {
  src: string
  alt: string
  isHorizontal?: boolean
}

interface PhoneReelProps {
  verticalVideos: VideoItem[]
  horizontalVideo: VideoItem
  isRotated: boolean
  onRotate: (rotated: boolean) => void
  locked: boolean
  onLockChange: (locked: boolean) => void
  currentIndex: number
  onIndexChange: (index: number) => void
}

const PHONE_W = 280
const PHONE_H = PHONE_W * 19.5 / 9

export function PhoneReel({
  verticalVideos,
  horizontalVideo,
  isRotated,
  onRotate,
  locked,
  onLockChange,
  currentIndex,
  onIndexChange,
}: PhoneReelProps) {
  const pausedByUser = useRef(new Set<number>())
  const reelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const isSnapping = useRef(false)
  const currentIndexRef = useRef(currentIndex)
  currentIndexRef.current = currentIndex
  const isRotatedRef = useRef(isRotated)
  isRotatedRef.current = isRotated
  const lastWheelTime = useRef(0)

  const [isMuted, setIsMuted] = useState(false)
  const [time, setTime] = useState("")
  const [quote, setQuote] = useState("")

  const quotes = [
    "The only way to do great work is to love what you do.",
    "In the middle of difficulty lies opportunity.",
    "Creativity is intelligence having fun.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Simplicity is the ultimate sophistication.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Everything you can imagine is real.",
    "Do what you can, with what you have, where you are.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Be yourself; everyone else is already taken.",
    "The journey of a thousand miles begins with a single step.",
    "What you do speaks so loudly that I cannot hear what you say.",
  ]

  const REAL_FIRST = 1
  const ROTATED_INDEX = verticalVideos.length + 1
  const CLONE_LEADING = 0
  const CLONE_TRAILING = verticalVideos.length + 2

  const allVideos: VideoItem[] = [
    { ...horizontalVideo, isHorizontal: true },
    ...verticalVideos,
    { ...horizontalVideo, isHorizontal: true },
    { ...verticalVideos[0] },
  ]

  const handleUnlock = useCallback(() => {
    onLockChange(false)
  }, [onLockChange])

  const handleLock = useCallback(() => {
    videoRefs.current.forEach((el) => {
      if (el) el.pause()
    })
    pausedByUser.current.clear()
    initDone.current = false
    onIndexChange(0)
    if (isRotated) {
      onRotate(false)
      setTimeout(() => onLockChange(true), 600)
    } else {
      onLockChange(true)
    }
  }, [isRotated, onRotate, onLockChange, onIndexChange])

  const togglePlay = useCallback((index: number) => {
    const el = videoRefs.current[index]
    if (!el) return
    if (el.paused) {
      el.play().catch(() => {})
      pausedByUser.current.delete(index)
    } else {
      el.pause()
      pausedByUser.current.add(index)
    }
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === currentIndex) {
        if (!pausedByUser.current.has(i)) {
          el.play().catch(() => {})
        }
      } else {
        el.pause()
        el.currentTime = 0
      }
    })
  }, [currentIndex])

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    const id = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, 4000)
    return () => clearInterval(id)
  }, [])

  const initDone = useRef(false)

  useEffect(() => {
    if (!locked && reelRef.current && !initDone.current) {
      initDone.current = true
      const target = currentIndex === 0
        ? REAL_FIRST * reelRef.current.clientHeight
        : currentIndex * reelRef.current.clientHeight
      reelRef.current.scrollTop = target
      if (currentIndex === 0) onIndexChange(REAL_FIRST)
    }
  }, [locked])

  useEffect(() => {
    const el = reelRef.current
    if (!el || locked) return

    const onScroll = () => {
      if (isSnapping.current) return

      const index = Math.round(el.scrollTop / el.clientHeight)
      const currIdx = currentIndexRef.current
      const rotated = isRotatedRef.current

      if (index !== currIdx) {
        if (index === CLONE_LEADING) {
          isSnapping.current = true
          el.scrollTop = ROTATED_INDEX * el.clientHeight
          onIndexChange(ROTATED_INDEX)
          if (!rotated) onRotate(true)
          requestAnimationFrame(() => { isSnapping.current = false })
        } else if (index === CLONE_TRAILING) {
          isSnapping.current = true
          el.scrollTop = REAL_FIRST * el.clientHeight
          onIndexChange(REAL_FIRST)
          if (rotated) onRotate(false)
          requestAnimationFrame(() => { isSnapping.current = false })
        } else {
          onIndexChange(index)
          if (index === ROTATED_INDEX && !rotated) {
            onRotate(true)
          } else if (index !== ROTATED_INDEX && rotated) {
            onRotate(false)
          }
        }
      }
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [onRotate, locked, REAL_FIRST, ROTATED_INDEX, CLONE_LEADING, CLONE_TRAILING, onIndexChange])

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastWheelTime.current < 400) return
      lastWheelTime.current = now
      if (reelRef.current) {
        const direction = e.deltaY > 0 ? 1 : -1
        const curIdx = Math.round(reelRef.current.scrollTop / reelRef.current.clientHeight)
        const newIdx = Math.max(0, curIdx + direction)
        reelRef.current.scrollTop = newIdx * reelRef.current.clientHeight
        e.preventDefault()
      }
    }
    el.addEventListener("wheel", handler, { passive: false })
    return () => el.removeEventListener("wheel", handler)
  }, [isRotated])

  return (
    <>
      <motion.div
        className="relative shrink-0"
        animate={{ rotate: isRotated ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        style={{
          transformOrigin: "center center",
          width: PHONE_W,
          height: PHONE_H,
          borderRadius: 36,
          border: locked ? "3px solid #000" : "3px solid rgba(255,255,255,0.15)",
          boxShadow: locked
            ? "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.1) inset"
            : "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset",
          overflow: "hidden",
          background: locked ? "linear-gradient(180deg, #87CEEB 0%, #E8F4FD 80%, #ffffff 100%)" : "#000",
        }}
      >
        {locked ? (
          <motion.button
            onClick={handleUnlock}
            className="w-full h-full flex flex-col items-center justify-between py-16 cursor-pointer select-none"
            whileHover={{ scale: 1.02 }}
            style={{
              backgroundImage: "url(/meadow/medows.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col items-center gap-3 pt-4">
              <span className="text-5xl font-semibold text-white/90 tracking-wider drop-shadow-lg">
                {time}
              </span>
              <p className="text-sm text-white/70 italic text-center px-6 leading-relaxed drop-shadow-md min-h-[2em]">
                {quote}
              </p>
            </div>
            <motion.span
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10px] text-white/80 tracking-widest uppercase"
            >
              tap to unlock
            </motion.span>
          </motion.button>
        ) : (
          <>
            <style>{`.phone-reel::-webkit-scrollbar { display: none; }`}</style>
            <div
              ref={reelRef}
              onWheel={(e) => e.stopPropagation()}
              className="phone-reel w-full h-full snap-y snap-mandatory"
              style={{ overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
            {allVideos.map((video, i) => (
              <div
                key={i}
                className="snap-start w-full h-full flex-shrink-0 relative bg-black"
                onClick={() => togglePlay(i)}
              >
                {video.isHorizontal && isRotated ? (
                  <div className="w-full h-full" />
                ) : (
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted={isMuted}
                    ref={(el) => { videoRefs.current[i] = el }}
                  />
                )}
              </div>
            ))}
            </div>
          </>
        )}

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[26px] bg-black rounded-b-2xl z-10 flex items-center justify-center pointer-events-none"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
        >
          <div className="w-[50px] h-[5px] bg-[#1a1a1a] rounded-full" />
        </div>
      </motion.div>

      {!locked && (
        <>
          <motion.button
            onClick={() => setIsMuted((m) => !m)}
            className="flex items-center justify-center cursor-pointer"
            style={{
              position: "absolute",
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              zIndex: 70,
              left: isRotated ? -(PHONE_H / 2 - PHONE_W / 2 + 56) : PHONE_W + 16,
              top: isRotated ? "calc(50% - 52px)" : 96,
              transform: isRotated ? "translateY(-50%)" : "none",
            }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>

          <motion.button
            onClick={handleLock}
            className="flex items-center justify-center cursor-pointer"
            style={{
              position: "absolute",
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              zIndex: 70,
              left: isRotated ? -(PHONE_H / 2 - PHONE_W / 2 + 56) : PHONE_W + 16,
              top: isRotated ? "calc(50% - 4px)" : 144,
              transform: isRotated ? "translateY(-50%)" : "none",
            }}
          >
            <Lock size={18} />
          </motion.button>
        </>
      )}

      {isRotated && !locked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          ref={overlayRef}
          className="pointer-events-auto overflow-hidden"
          style={{
            position: "absolute",
            width: PHONE_H,
            height: PHONE_W,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 36,
            border: "3px solid rgba(255,255,255,0.15)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset",
            zIndex: 60,
          }}
        >
          <div
            className="absolute z-10 flex flex-col items-center justify-center"
            style={{
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              width: 26,
              height: 100,
              borderRadius: "12px 0 0 12px",
              background: "#000",
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            <div className="w-[5px] h-[50px] bg-[#1a1a1a] rounded-full" />
          </div>
          <video
            ref={(el) => { videoRefs.current[ROTATED_INDEX] = el }}
            src={horizontalVideo.src}
            className="w-full h-full object-cover"
            style={{ pointerEvents: "auto" }}
            loop
            playsInline
            muted={isMuted}
            onClick={() => togglePlay(ROTATED_INDEX)}
          />
        </motion.div>
      )}
    </>
  )
}
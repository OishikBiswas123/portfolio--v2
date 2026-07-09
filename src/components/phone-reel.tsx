"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const isSnapping = useRef(false)

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

      if (index !== currentIndex) {
        if (index === CLONE_LEADING) {
          isSnapping.current = true
          el.scrollTop = ROTATED_INDEX * el.clientHeight
          onIndexChange(ROTATED_INDEX)
          if (!isRotated) onRotate(true)
          requestAnimationFrame(() => { isSnapping.current = false })
        } else if (index === CLONE_TRAILING) {
          isSnapping.current = true
          el.scrollTop = REAL_FIRST * el.clientHeight
          onIndexChange(REAL_FIRST)
          if (isRotated) onRotate(false)
          requestAnimationFrame(() => { isSnapping.current = false })
        } else {
          onIndexChange(index)
          if (index === ROTATED_INDEX && !isRotated) {
            onRotate(true)
          } else if (index !== ROTATED_INDEX && isRotated) {
            onRotate(false)
          }
        }
      }
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [currentIndex, isRotated, onRotate, locked, REAL_FIRST, ROTATED_INDEX, CLONE_LEADING, CLONE_TRAILING, onIndexChange])

  return (
    <motion.div
      className="relative shrink-0"
      animate={{ rotate: isRotated ? 90 : 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      style={{
        transformOrigin: "center center",
        width: PHONE_W,
        height: PHONE_H,
        borderRadius: 36,
        border: "3px solid rgba(255,255,255,0.15)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {locked ? (
        <motion.button
          onClick={handleUnlock}
          className="w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer select-none bg-black"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-2xl font-light text-white/80 tracking-wider">
            9:41
          </span>
          <motion.span
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[11px] text-white/40 tracking-widest uppercase"
          >
            tap to unlock
          </motion.span>
        </motion.button>
      ) : (
        <div
          ref={reelRef}
          onWheel={(e) => e.stopPropagation()}
          className="w-full h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        >
          {allVideos.map((video, i) => (
            <div
              key={i}
              className="snap-start w-full h-full flex-shrink-0 relative bg-black"
              onClick={() => togglePlay(i)}
            >
              <video
                src={video.src}
                className={`w-full h-full ${video.isHorizontal && isRotated ? "object-contain" : "object-cover"}`}
                loop
                playsInline
                muted
                ref={(el) => {
                  videoRefs.current[i] = el
                  if (el) {
                    if (i === currentIndex) {
                      if (!pausedByUser.current.has(i)) {
                        el.play().catch(() => {})
                      }
                    } else {
                      el.pause()
                      el.currentTime = 0
                    }
                  }
                }}
              />
              {!locked && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                  <p className="text-[10px] text-white/70 truncate">
                    {video.alt}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[26px] bg-black rounded-b-2xl z-10 flex items-center justify-center pointer-events-none"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
      >
        <div className="w-[50px] h-[5px] bg-[#1a1a1a] rounded-full" />
      </div>
    </motion.div>
  )
}
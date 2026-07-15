"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { musicTracks } from "@/lib/entertainment-data"

export function MyMusicPicks({ resetKey = 0, onTrackChange }: { resetKey?: number; onTrackChange?: () => void }) {
  const [centerIndex, setCenterIndex] = useState(0)
  const swipeBarRef = useRef<HTMLDivElement>(null)
  const prevCenterRef = useRef(centerIndex)

  const goTo = useCallback((index: number) => {
    setCenterIndex(((index % musicTracks.length) + musicTracks.length) % musicTracks.length)
  }, [])

  useEffect(() => {
    if (prevCenterRef.current !== centerIndex) {
      onTrackChange?.()
      prevCenterRef.current = centerIndex
    }
  }, [centerIndex, onTrackChange])

  useEffect(() => {
    const bar = swipeBarRef.current
    if (!bar) return

    let startX = 0
    let startY = 0

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - startX
      const deltaY = e.changedTouches[0].clientY - startY
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        e.preventDefault()
        if (deltaX > 0) {
          goTo(centerIndex - 1)
        } else {
          goTo(centerIndex + 1)
        }
      }
    }

    bar.addEventListener('touchstart', onTouchStart, { passive: true })
    bar.addEventListener('touchend', onTouchEnd, { passive: false })

    return () => {
      bar.removeEventListener('touchstart', onTouchStart)
      bar.removeEventListener('touchend', onTouchEnd)
    }
  }, [centerIndex, goTo])

  const handleCardClick = useCallback((index: number) => {
    if (index !== centerIndex) {
      goTo(index)
    }
  }, [centerIndex, goTo])

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span className="text-sm uppercase tracking-[0.25em] text-text-muted font-semibold">
          The Soundtrack of My Life
        </span>
        <p className="mt-3 text-lg text-text-secondary leading-relaxed max-w-md mx-auto">
          Songs that define moments.
        </p>
      </div>

      <div className="relative mt-16" style={{ perspective: "1700px" }}>
        <div className="relative mx-auto" style={{ height: "clamp(300px,44vw,400px)", maxWidth: "100vw" }}>
          {/* Swipe bar — sibling of cards, not an ancestor of iframes */}
          <div
            ref={swipeBarRef}
            className="absolute inset-x-0 top-0 h-3/5 z-30"
          />

          {musicTracks.map((track, i) => {
            const n = musicTracks.length
            const half = Math.floor(n / 2)
            let diff = i - centerIndex
            if (diff > half) diff -= n
            if (diff < -half) diff += n
            const isCenter = diff === 0
            const absDiff = Math.abs(diff)

            const xOffset = diff * 220
            const rotate = diff * 10
            const scale = 1 - absDiff * 0.1
            const zIndex = musicTracks.length - absDiff
            const opacity = 1 - absDiff * 0.15

            return (
              <motion.div
                key={i}
                onClick={isCenter ? undefined : () => handleCardClick(i)}
                className="absolute left-1/2 top-0"
                style={{ width: "clamp(320px,44vw,440px)", zIndex }}
                animate={{
                  x: `calc(-50% + ${xOffset}px)`,
                  rotateY: `${rotate}deg`,
                  scale: Math.max(0.4, scale),
                  opacity: Math.max(0.15, opacity),
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <div className="relative rounded-xl shadow-2xl overflow-hidden bg-white/5">
                  <div style={{ pointerEvents: isCenter ? "auto" : "none" }} className="overflow-hidden">
                    <iframe
                      key={`${track.spotifyId}-${isCenter ? centerIndex : ''}-${resetKey}`}
                      src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="232"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="block"
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => goTo(centerIndex - 1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-text-muted font-mono">
            {centerIndex + 1} / {musicTracks.length}
          </span>
          <button
            onClick={() => goTo(centerIndex + 1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

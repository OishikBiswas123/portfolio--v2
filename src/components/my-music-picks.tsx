"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { musicTracks } from "@/lib/entertainment-data"

export function MyMusicPicks() {
  const [centerIndex, setCenterIndex] = useState(Math.floor(musicTracks.length / 2))

  const goTo = useCallback((index: number) => {
    setCenterIndex(((index % musicTracks.length) + musicTracks.length) % musicTracks.length)
  }, [])

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
          {musicTracks.map((track, i) => {
            const diff = i - centerIndex
            const isCenter = diff === 0
            const absDiff = Math.abs(diff)

            const xOffset = diff * -220
            const rotate = diff * -10
            const scale = 1 - absDiff * 0.1
            const zIndex = musicTracks.length - absDiff
            const opacity = 1 - absDiff * 0.15

            return (
              <motion.button
                key={i}
                onClick={() => handleCardClick(i)}
                className="absolute left-1/2 top-0 cursor-pointer select-none"
                style={{ width: "clamp(320px,44vw,440px)", zIndex }}
                animate={{
                  x: `calc(-50% + ${xOffset}px)`,
                  rotateY: `${rotate}deg`,
                  scale: Math.max(0.4, scale),
                  opacity: Math.max(0.15, opacity),
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                whileHover={!isCenter ? { y: -8 } : undefined}
              >
                <div className="relative rounded-xl shadow-2xl overflow-hidden bg-white/5">
                  <div style={{ pointerEvents: isCenter ? "auto" : "none" }} className="overflow-hidden">
                    <iframe
                      src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="232"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="block"
                    />
                  </div>
                </div>
              </motion.button>
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

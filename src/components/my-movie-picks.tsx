"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { moviePicks } from "@/lib/entertainment-data"

export function MyMoviePicks() {
  const [centerIndex, setCenterIndex] = useState(Math.floor(moviePicks.length / 2))

  const goTo = useCallback((index: number) => {
    setCenterIndex(((index % moviePicks.length) + moviePicks.length) % moviePicks.length)
  }, [])

  const handleCardClick = useCallback((index: number) => {
    if (index === centerIndex) {
      window.open(moviePicks[index].url, "_blank", "noopener,noreferrer")
    } else {
      goTo(index)
    }
  }, [centerIndex, goTo])

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span className="text-sm uppercase tracking-[0.25em] text-text-muted font-semibold">
          Frame by Frame
        </span>
        <p className="mt-3 text-lg text-text-secondary leading-relaxed max-w-md mx-auto">
          Stories that stayed with me.
        </p>
      </div>

      <div className="relative mt-16" style={{ perspective: "1700px" }}>
        <div className="relative mx-auto" style={{ height: "clamp(280px,45vw,420px)", maxWidth: "100vw" }}>
          {moviePicks.map((item, i) => {
            const diff = i - centerIndex
            const isCenter = diff === 0
            const absDiff = Math.abs(diff)

            const xOffset = diff * -140
            const rotate = diff * -12
            const scale = 1 - absDiff * 0.12
            const zIndex = moviePicks.length - absDiff
            const opacity = 1 - absDiff * 0.12

            return (
              <motion.button
                key={i}
                onClick={() => handleCardClick(i)}
                className="absolute left-1/2 top-0 cursor-pointer select-none"
                style={{ width: "clamp(140px,22vw,200px)", zIndex }}
                animate={{
                  x: `calc(-50% + ${xOffset}px)`,
                  rotateY: `${rotate}deg`,
                  scale: Math.max(0.4, scale),
                  opacity: Math.max(0.15, opacity),
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                whileHover={!isCenter ? { y: -8 } : undefined}
              >
                <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-8">
                    <p className="text-xs font-medium text-white text-left leading-tight line-clamp-2">
                      {item.title}
                    </p>
                    {isCenter && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-text-muted">
                        <ExternalLink size={10} />
                        {item.platform}
                      </span>
                    )}
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
            {centerIndex + 1} / {moviePicks.length}
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

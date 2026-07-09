"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Image, Video } from "lucide-react"
import { cn } from "@/lib/utils"

interface GalleryItem {
  src: string
  alt: string
  type: "image" | "video"
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all")
  const [selected, setSelected] = useState<number | null>(null)

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.type === filter)),
    [items, filter]
  )

  const imageCount = items.filter((i) => i.type === "image").length
  const videoCount = items.filter((i) => i.type === "video").length

  const openLightbox = (index: number) => setSelected(index)
  const closeLightbox = () => setSelected(null)
  const prev = () => setSelected((s) => (s !== null && s > 0 ? s - 1 : s))
  const next = () =>
    setSelected((s) => (s !== null && s < filtered.length - 1 ? s + 1 : s))

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-1.5 p-1.5 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-4 py-2 text-xs uppercase tracking-widest rounded-xl transition-all",
              filter === "all"
                ? "bg-white/20 dark:bg-white/10 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-white/10 dark:hover:bg-white/5"
            )}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setFilter("image")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest rounded-xl transition-all",
              filter === "image"
                ? "bg-white/20 dark:bg-white/10 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-white/10 dark:hover:bg-white/5"
            )}
          >
            <Image size={14} />
            Photos ({imageCount})
          </button>
          <button
            onClick={() => setFilter("video")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest rounded-xl transition-all",
              filter === "video"
                ? "bg-white/20 dark:bg-white/10 text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-white/10 dark:hover:bg-white/5"
            )}
          >
            <Video size={14} />
            Videos ({videoCount})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className={cn(
              "group relative overflow-hidden border border-border-light hover:border-text-muted transition-colors",
              item.type === "video" ? "col-span-2 row-span-2" : "aspect-square"
            )}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
            ) : (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                muted
                loop
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause()
                  e.currentTarget.currentTime = 0
                }}
              />
            )}
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <Video size={20} className="text-black ml-0.5" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {selected > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {selected < filtered.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Next"
              >
                <ChevronRight size={32} />
              </button>
            )}

            <div className="absolute bottom-4 text-xs text-white/50 tracking-widest">
              {selected + 1} / {filtered.length}
            </div>

            {filtered[selected].type === "image" ? (
              <img
                src={filtered[selected].src}
                alt={filtered[selected].alt}
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <video
                src={filtered[selected].src}
                className="max-w-full max-h-[90vh]"
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

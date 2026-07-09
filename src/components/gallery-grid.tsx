"use client"

import { motion, LayoutGroup } from "framer-motion"

interface GalleryItem {
  src: string
  alt: string
  type: "image" | "video"
}

interface GalleryGridProps {
  items: GalleryItem[]
  isRotated: boolean
  mode?: "all" | "top" | "bottom"
}

export function GalleryGrid({
  items,
  isRotated,
  mode = "all",
}: GalleryGridProps) {
  const images = items.filter((i) => i.type === "image")
  const splitIndex = Math.ceil(images.length / 2)
  const topImages = images.slice(0, splitIndex)
  const bottomImages = images.slice(splitIndex)

  const colClass = isRotated
    ? "columns-3 sm:columns-4 lg:columns-6 gap-4"
    : "columns-2 sm:columns-3 lg:columns-4 gap-4"

  if (!isRotated) {
    return (
      <LayoutGroup>
        <div className="relative">
          <div className={colClass}>
            {images.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.4, ease: "easeOut" }}
                className="break-inside-avoid mb-3"
              >
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/[8] hover:border-white/30 transition-all cursor-pointer">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </LayoutGroup>
    )
  }

  const currentImages = mode === "top" ? topImages : bottomImages

  return (
    <LayoutGroup>
      <div className="relative">
        <div className={colClass}>
          {currentImages.map((item, i) => (
            <motion.div
              key={item.src}
              layout
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.4, ease: "easeOut" }}
              className="break-inside-avoid mb-3"
            >
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/[8] hover:border-white/30 transition-all cursor-pointer">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </LayoutGroup>
  )
}
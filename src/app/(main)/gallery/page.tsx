"use client"

import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { GalleryGrid } from "@/components/gallery-grid"
import { PhoneReel } from "@/components/phone-reel"
import { galleryItems } from "@/lib/data"
import { onLenisScroll, scrollToLenis } from "@/components/smooth-scroll-provider"

export default function GalleryPage() {
  const [isRotated, setIsRotated] = useState(false)
  const [phoneLocked, setPhoneLocked] = useState(true)
  const [phoneIndex, setPhoneIndex] = useState(0)
  const [phoneLeft, setPhoneLeft] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const phoneTop = useMotionValue(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  const updatePhoneLeft = useCallback(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect()
      setPhoneLeft(rect.right + 24)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)
    phoneTop.set(window.innerHeight / 2)
    updatePhoneLeft()
    window.addEventListener("resize", updatePhoneLeft)
    const mq = window.matchMedia("(max-width: 767px)")
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => {
      window.removeEventListener("resize", updatePhoneLeft)
      mq.removeEventListener("change", handler)
    }
  }, [updatePhoneLeft, phoneTop])

  useEffect(() => {
    requestAnimationFrame(updatePhoneLeft)
  }, [isRotated, updatePhoneLeft])

  useEffect(() => {
    if (isRotated) {
      if (!isMobile) {
        const gapEl = document.querySelector("[data-gallery-gap]")
        if (gapEl) {
          const rect = gapEl.getBoundingClientRect()
          phoneTop.set(rect.top + rect.height / 2)
        }

        requestAnimationFrame(() => {
          const gapEl = document.querySelector("[data-gallery-gap]")
          if (gapEl) {
            const rect = gapEl.getBoundingClientRect()
            const target = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2
            scrollToLenis(target, { duration: 1.2 })
          }
        })
      }
    } else {
      animate(phoneTop, window.innerHeight / 2, {
        type: "tween",
        duration: 0.75,
        ease: "easeInOut",
      })
    }
  }, [isRotated, phoneTop, isMobile])

  useEffect(() => {
    if (!isRotated || isMobile) return

    const unsub = onLenisScroll(() => {
      const gapEl = document.querySelector("[data-gallery-gap]")
      if (gapEl) {
        const rect = gapEl.getBoundingClientRect()
        phoneTop.set(rect.top + rect.height / 2)
      }
    })

    return unsub
  }, [isRotated, phoneTop, isMobile])

  const verticalVideos = useMemo(
    () =>
      galleryItems.filter(
        (i) => i.type === "video" && !i.alt.toLowerCase().includes("college performance"),
      ),
    [],
  )

  const horizontalVideo = useMemo(
    () =>
      galleryItems.find(
        (i) => i.type === "video" && i.alt.toLowerCase().includes("college performance"),
      )!,
    [],
  )

  const phoneScale = useMemo(() => {
    if (!isMobile) return 1
    return phoneLocked ? 0.3 : 0.6
  }, [isMobile, phoneLocked])

  const animateTarget = useMemo((): any => {
    if (!isMobile) {
      return {
        left: isRotated ? "50%" : `${phoneLeft}px`,
        x: isRotated ? "-50%" : 0,
        y: "-50%",
        scale: 1,
      }
    }
    if (isRotated) return { scale: phoneScale, translateX: "-50%", translateY: "0%" }
    return { scale: phoneScale }
  }, [isMobile, isRotated, phoneLeft, phoneScale])

  const positionStyle = useMemo((): any => {
    if (!isMobile) return { top: phoneTop }
    if (isRotated) return { bottom: 0, left: "calc(50% + 20px)", transformOrigin: "center center" }
    return { bottom: 100, right: 20, transformOrigin: "bottom right" }
  }, [isMobile, isRotated, phoneTop])

  const mobileTransition = useMemo((): any => {
    if (!isMobile) {
      return {
        left: { type: "tween", duration: 0.75, ease: "easeInOut" },
        x: { type: "tween", duration: 0.75, ease: "easeInOut" },
      }
    }
    return { scale: { type: "spring", stiffness: 350, damping: 25 }, translateX: { type: "tween", duration: 0.4, ease: "easeInOut" } }
  }, [isMobile])

  const gridRotated = isMobile ? false : isRotated

  const phoneProps = {
    verticalVideos,
    horizontalVideo,
    isRotated,
    onRotate: setIsRotated,
    locked: phoneLocked,
    onLockChange: setPhoneLocked,
    currentIndex: phoneIndex,
    onIndexChange: setPhoneIndex,
    isMobile,
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-6xl px-6 pt-24 relative z-10">
        <div className="max-w-2xl mb-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-tight">
            Spotlight
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
            Moments frozen in time — from projects and events to everyday life,
            here&apos;s a visual diary of what I&apos;ve been up to.
          </p>
        </div>

        <div className={isRotated ? "" : "md:pr-[340px]"}>
          <div ref={contentRef}>
            <GalleryGrid
              items={galleryItems}
              isRotated={gridRotated}
            />
          </div>
        </div>
      </div>

      {mounted && (
        <motion.div
          className="fixed z-50"
          initial={false}
          animate={animateTarget}
          style={positionStyle}
          transition={mobileTransition}
        >
          <PhoneReel {...phoneProps} />
        </motion.div>
      )}
    </div>
  )
}
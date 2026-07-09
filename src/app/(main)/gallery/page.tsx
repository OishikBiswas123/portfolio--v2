"use client"

import { useState, useMemo, useRef, useEffect, useCallback } from "react"
import { GalleryGrid } from "@/components/gallery-grid"
import { PhoneReel } from "@/components/phone-reel"
import { galleryItems } from "@/lib/data"

export default function GalleryPage() {
  const [isRotated, setIsRotated] = useState(false)
  const [phoneLocked, setPhoneLocked] = useState(true)
  const [phoneIndex, setPhoneIndex] = useState(0)
  const [phoneLeft, setPhoneLeft] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const inlineRef = useRef<HTMLDivElement>(null)

  const updatePhoneLeft = useCallback(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect()
      setPhoneLeft(rect.right + 24)
    }
  }, [])

  useEffect(() => {
    updatePhoneLeft()
    window.addEventListener("resize", updatePhoneLeft)
    return () => window.removeEventListener("resize", updatePhoneLeft)
  }, [updatePhoneLeft])

  useEffect(() => {
    requestAnimationFrame(updatePhoneLeft)
  }, [isRotated, updatePhoneLeft])

  useEffect(() => {
    if (isRotated) {
      requestAnimationFrame(() => {
        inlineRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      })
    }
  }, [isRotated])

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

  const phoneProps = {
    verticalVideos,
    horizontalVideo,
    isRotated,
    onRotate: setIsRotated,
    locked: phoneLocked,
    onLockChange: setPhoneLocked,
    currentIndex: phoneIndex,
    onIndexChange: setPhoneIndex,
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

        {isRotated ? (
          <div>
            <GalleryGrid items={galleryItems} isRotated={true} mode="top" />
            <div ref={inlineRef} className="flex items-center justify-center h-[280px] my-4">
              <PhoneReel {...phoneProps} />
            </div>
            <GalleryGrid items={galleryItems} isRotated={true} mode="bottom" />
          </div>
        ) : (
          <div className="md:pr-[340px]">
            <div ref={contentRef}>
              <GalleryGrid items={galleryItems} isRotated={false} />
            </div>
          </div>
        )}
      </div>

      {!isRotated && (
        <div
          className="fixed z-50"
          style={{
            left: phoneLeft,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <PhoneReel {...phoneProps} />
        </div>
      )}
    </div>
  )
}
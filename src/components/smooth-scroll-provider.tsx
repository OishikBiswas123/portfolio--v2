"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

let lenisInstance: Lenis | null = null
const listeners = new Set<(scroll: number) => void>()

export function getLenisScroll() {
  return lenisInstance?.scroll ?? 0
}

export function scrollToLenis(target: number, options?: { duration?: number }) {
  lenisInstance?.scrollTo(target, { duration: options?.duration ?? 1 })
}

export function onLenisScroll(fn: (scroll: number) => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    })

    lenisInstance = lenis

    lenis.on("scroll", ({ scroll: s }) => {
      listeners.forEach((fn) => fn(s))
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisInstance = null
      listeners.clear()
    }
  }, [])

  return <>{children}</>
}

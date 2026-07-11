"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

const images = [
  { src: "/pfp/photo-1.jpg", alt: "Oishik" },
  { src: "/cartoon/avatar-1.svg", alt: "Oishik avatar" },
  { src: "/pfp/photo-2.jpg", alt: "Oishik" },
  { src: "/cartoon/avatar-2.svg", alt: "Oishik avatar" },
  { src: "/pfp/photo-3.jpg", alt: "Oishik" },
  { src: "/cartoon/avatar-3.svg", alt: "Oishik avatar" },
  { src: "/pfp/photo-4.jpg", alt: "Oishik" },
  { src: "/cartoon/avatar-4.svg", alt: "Oishik avatar" },
  { src: "/pfp/photo-5.jpg", alt: "Oishik" },
  { src: "/cartoon/avatar-5.svg", alt: "Oishik avatar" },
]

const stickerGifs = [
  "/Gif/sticker-1.gif",
  "/Gif/sticker-2.gif",
  "/Gif/sticker-3.gif",
  "/Gif/sticker-4.gif",
  "/Gif/sticker-5.gif",
]

const BURST_COLORS = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#FF9FF3", "#F368E0", "#FFD93D"]

function playClick() {
  const ctx = new AudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = "sine"
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.value = 1000
  gain.gain.setValueAtTime(0.12, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.035)
}

function triggerBurst(x: number, y: number) {
  const overlay = document.createElement("div")
  overlay.style.cssText = "position:fixed;inset:0;z-index:9999;pointer-events:none;"
  const count = 20 + Math.floor(Math.random() * 16)
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div")
    const angle = (i / count) * 360 + (Math.random() - 0.5) * 40
    const rad = angle * (Math.PI / 180)
    const dist = 40 + Math.random() * 140
    const size = 4 + Math.random() * 8
    const round = Math.random() > 0.5
    p.style.cssText = `
      position:absolute;left:${x}px;top:${y}px;
      width:${size}px;height:${size}px;
      border-radius:${round ? "50%" : "2px"};
      background:${BURST_COLORS[i % BURST_COLORS.length]};
      animation:burstParticle ${0.35 + Math.random() * 0.35}s ease-out forwards;
      --tx:${Math.cos(rad) * dist}px;--ty:${Math.sin(rad) * dist}px;
    `
    overlay.appendChild(p)
  }
  document.body.appendChild(overlay)
  setTimeout(() => overlay.remove(), 900)
}

export function PfpSwitcher() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [current, setCurrent] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle")
  const [gifIdx, setGifIdx] = useState(0)
  const [burst, setBurst] = useState<{ idx: number; x: number; y: number } | null>(null)

  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const resetToDefault = useCallback(() => {
    setCurrent(0)
    setNext(null)
    setPhase("idle")
    setBurst(null)
  }, [])

  const startResetTimer = useCallback(() => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(resetToDefault, 20000)
  }, [resetToDefault])

  useEffect(() => {
    startResetTimer()
    return () => { if (resetTimer.current) clearTimeout(resetTimer.current) }
  }, [current, startResetTimer])

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (phase !== "idle") return

      playClick()

      const rect = e.currentTarget.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const n = (current + 1) % images.length

      setNext(n)
      setPhase("exiting")
      setBurst({ idx: gifIdx % stickerGifs.length, x: cx, y: cy })
      setGifIdx((i) => i + 1)
      triggerBurst(cx, cy)

      setTimeout(() => setPhase("entering"), 400)
      setTimeout(() => {
        setCurrent(n)
        setNext(null)
        setPhase("idle")
      }, 750)
      setTimeout(() => setBurst(null), 1200)
    },
    [current, phase, gifIdx],
  )

  return (
    <>
      {burst !== null && createPortal(
        <div
          className="pfp-sticker-overlay"
          style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}
        >
          <img
            src={stickerGifs[burst.idx]}
            alt=""
            className="pfp-sticker-burst"
            style={{
              position: "absolute",
              left: burst.x,
              top: burst.y,
              width: "min(500px, 80vw)",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
            draggable={false}
          />
        </div>,
        document.body,
      )}

      <button
        ref={btnRef}
        onClick={handleClick}
        className="flex-shrink-0 relative w-12 h-12 rounded-xl overflow-hidden border-2 border-text-primary/30 hover:border-text-primary/60 transition-colors outline-none focus-visible:ring-2 ring-text-primary/40"
        title="Click to switch"
      >
        <img
          src={images[current].src}
          alt={images[current].alt}
          className={cn(
            "absolute inset-0 w-full h-full object-cover rounded-xl select-none pointer-events-none",
            phase === "exiting" && "pfp-exit-click",
          )}
          style={{ zIndex: phase === "idle" || phase === "exiting" ? 1 : 0, willChange: "transform, opacity" }}
        />

        {next !== null && (
          <img
            src={images[next].src}
            alt={images[next].alt}
            className={cn(
              "absolute inset-0 w-full h-full object-cover rounded-xl select-none pointer-events-none",
              phase === "entering" && "pfp-enter-zoom",
            )}
            style={{ zIndex: 2, willChange: "transform, opacity" }}
          />
        )}
      </button>
    </>
  )
}

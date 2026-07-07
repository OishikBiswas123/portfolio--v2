"use client"

import { useEffect, useRef } from "react"
import { useSkyTheme } from "./sky-theme-provider"

const BEE_COUNT = 5
const ORIG = [[43, 57], [43, 56], [34, 47]]

export function Bees() {
  const { theme } = useSkyTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const isNight = theme === "night"

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const bees: {
      el: HTMLDivElement
      x: number
      y: number
      vx: number
      vy: number
      phase: number
      bobAmp: number
      swayAmp: number
      scale: number
    }[] = []

    for (let i = 0; i < BEE_COUNT; i++) {
      const bi = (i % 3) + 1
      const o = ORIG[i % 3]
      const el = document.createElement("div")
      el.className = "bee"
      el.innerHTML = `
        <div class="bee-art">
          <img class="bee-body" src="/bees/bee${bi}_body.png" alt="" />
          <img class="bee-wing" src="/bees/bee${bi}_wing.png" alt="" style="transform-origin:${o[0]}% ${o[1]}%;animation-delay:${(Math.random() * 0.1).toFixed(2)}s" />
          <span class="bee-fly"></span>
        </div>`
      container.appendChild(el)

      bees.push({
        el,
        x: Math.random() * innerWidth,
        y: 80 + Math.random() * (innerHeight - 200),
        vx: (Math.random() < 0.5 ? -1 : 1) * (0.2 + Math.random() * 0.28),
        vy: (Math.random() - 0.5) * 0.2,
        phase: Math.random() * Math.PI * 2,
        bobAmp: 7 + Math.random() * 7,
        swayAmp: 6 + Math.random() * 8,
        scale: 0.42 + Math.random() * 0.42,
      })
    }

    let raf: number
    const loop = () => {
      for (const b of bees) {
        b.phase += 0.045 + Math.random() * 0.03
        b.x += b.vx
        b.y += b.vy
        const dx = Math.sin(b.phase * 0.7) * b.swayAmp
        const dy = Math.sin(b.phase) * b.bobAmp
        const tilt = Math.cos(b.phase) * 5
        const face = b.vx < 0 ? -1 : 1
        b.el.style.transform = `translate(${b.x + dx}px, ${b.y + dy}px)`
        b.el.querySelector<HTMLElement>(".bee-art")!.style.transform = `rotate(${tilt}deg) scaleX(${face}) scale(${b.scale})`
        if (b.x > innerWidth + 70) { b.x = -70; b.y = 80 + Math.random() * (innerHeight - 200) }
        if (b.x < -70) { b.x = innerWidth + 70; b.y = 80 + Math.random() * (innerHeight - 200) }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`bees-wrap ${isNight ? "night" : ""}`}
      aria-hidden="true"
    />
  )
}

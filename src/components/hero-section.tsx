"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LetterHoverText } from "@/components/letter-hover-text"
import { Bees } from "@/components/bees"
import { LightMotes } from "@/components/light-motes"
export function HeroSection() {
  const meadowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = meadowRef.current
    if (!el) return
    let tmx = 0, tmy = 0, mx = 0, my = 0
    const onMove = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5)
      tmy = (e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    let raf: number
    const loop = () => {
      mx += (tmx - mx) * 0.06
      my += (tmy - my) * 0.06
      el.style.transform = `translate(${-mx * 36}px, ${-my * 22}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <LightMotes />
      <Bees />
      <div ref={meadowRef} className="absolute z-0 pointer-events-none select-none" style={{ left: 0, width: '100vw', bottom: '-2%' }}>
        <img
          src="/meadow/medows.png"
          alt=""
          className="w-full h-auto"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
          }}
        />
      </div>
      <div className="relative max-w-3xl z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.3em] text-text-muted mb-6"
          style={{ textShadow: "var(--hero-shadow)" }}
        >
          Developer & Creator
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-text-primary leading-none whitespace-nowrap"
          style={{ textShadow: "var(--hero-shadow)" }}
        >
          <LetterHoverText text="Oishik Biswas" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-8 text-lg text-text-secondary max-w-md leading-relaxed"
          style={{ textShadow: "var(--hero-shadow)" }}
        >
          I build games, websites, and interactive experiences — from Unity
          titles on the Play Store to full client deliveries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-start gap-4"
        >
          <Link
            href="/projects"
            className="px-8 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm uppercase tracking-widest text-text-primary hover:bg-white/30 dark:hover:bg-white/20 transition-all"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border border-white/20 rounded-full text-sm uppercase tracking-widest text-text-secondary hover:bg-white/10 dark:hover:bg-white/5 hover:text-text-primary transition-all"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

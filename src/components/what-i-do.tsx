"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion"
import { onLenisScroll } from "@/components/smooth-scroll-provider"

const items = [
  {
    num: "01",
    title: "Web Development",
    tags: "Responsive · Modern · Fast",
    desc: "Building websites with clean code, smooth interactions, and performance in mind.",
  },
  {
    num: "02",
    title: "Android Development",
    tags: "Native Apps · Kotlin · Java",
    desc: "Creating Android applications with intuitive interfaces and reliable functionality.",
  },
  {
    num: "03",
    title: "AI & Automation",
    tags: "LLMs · Prompt Engineering · AI Tools",
    desc: "Exploring AI-powered workflows and integrating intelligent features into digital products.",
  },
  {
    num: "04",
    title: "UI/UX Design",
    tags: "Wireframes · Interfaces · Prototypes",
    desc: "Designing clean, user-friendly experiences that balance aesthetics with usability.",
  },
  {
    num: "05",
    title: "Game Development",
    tags: "Unity · 2.5D · Interactive Systems",
    desc: "Building immersive gameplay mechanics, environments, and interactive experiences.",
  },
  {
    num: "06",
    title: "Branding & Digital Experiences",
    tags: "Identity · Websites · Creative Direction",
    desc: "Helping businesses establish a strong online presence through thoughtful design and development.",
  },
]

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

function Card({ item, index }: { item: (typeof items)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" })

  return (
    <motion.div
      ref={ref}
      animate={{
        scale: inView ? 1 : 0.88,
        opacity: inView ? 1 : 0.4,
      }}
      transition={{ duration: 0.5, ease }}
      className="w-full py-1 border-b border-text-muted/40 last:border-b-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_300px] gap-x-6 gap-y-2 md:gap-y-0">
        <span className="col-[1] row-[1/3] text-base font-black text-text-muted/30 leading-none pt-1 select-none">
          {item.num}
        </span>
        <h3 className="col-[2] text-5xl sm:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight">
          {item.title}
        </h3>
        <span className="col-[3] text-[10px] uppercase tracking-[0.15em] text-text-muted text-right pt-1.5 leading-snug">
          {item.tags}
        </span>
        <p className="col-[3] text-xs text-text-secondary leading-relaxed text-right pt-0.5">
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export function WhatIDo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [viewportH, setViewportH] = useState(0)
  const rawProgress = useMotionValue(0)

  useEffect(() => {
    setViewportH(window.innerHeight)
    const onResize = () => setViewportH(window.innerHeight)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    return onLenisScroll((scrollY) => {
      if (!sectionRef.current || !viewportH) return
      const top = sectionRef.current.offsetTop
      const height = sectionRef.current.offsetHeight
      const sectionStart = top - viewportH
      const sectionEnd = top + height
      const progress = Math.max(
        0,
        Math.min(1, (scrollY - sectionStart) / (sectionEnd - sectionStart)),
      )
      rawProgress.set(progress)
    })
  }, [viewportH])

  const smoothProgress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  })

  const dreamScale = useTransform(smoothProgress, [0, 0.5, 1], [0.72, 1, 1.32])
  const dreamOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const displayOpacity = useTransform(dreamOpacity, (v) => v * 0.13)

  return (
    <section
      ref={sectionRef}
      id="what-i-do"
      className="relative py-section"
    >
      <motion.span
        style={{
          scale: dreamScale,
          opacity: displayOpacity,
          letterSpacing: "-0.05em",
        }}
        className="fixed inset-0 flex items-center justify-center text-[25vw] font-black text-text-primary leading-none select-none pointer-events-none z-0"
      >
        dream.
      </motion.span>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,280px)_1fr] gap-x-8 gap-y-6 lg:gap-y-0">
          <aside className="sticky top-[20vh] self-start">
            <span className="text-xs uppercase tracking-[0.25em] text-text-muted">
              what i do
            </span>
            <h2 className="mt-4 text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-tight">
              the full loop.
            </h2>
            <p className="mt-4 text-base text-text-secondary leading-relaxed">
              Research, design, and the code to ship it — one set of hands, no
              handoffs, from the first user interview to production.
            </p>
          </aside>

          <div>
            {items.map((item, i) => (
              <Card key={item.num} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

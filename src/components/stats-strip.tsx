"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"

interface CountStat {
  type: "count"
  value: number
  suffix: string
  label: string
}

interface TextStat {
  type: "text"
  display: string
}

type Stat = CountStat | TextStat

const stats: Stat[] = [
  { type: "count", value: 10, suffix: "+", label: "Projects Completed." },
  { type: "count", value: 5, suffix: "+", label: "Technologies Explored." },
  { type: "text", display: "∞ Curiosity Always Growing." },
  { type: "count", value: 100, suffix: "%", label: "Self-Learning." },
  { type: "text", display: "Always Building Something New." },
]

function AnimatedNumber({ to, inView }: { to: number; inView: boolean }) {
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { type: "spring", stiffness: 50, damping: 10 })
      return () => controls.stop()
    } else {
      count.set(0)
    }
  }, [inView, to, count])

  return <motion.span>{display}</motion.span>
}

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-80px" })

  return (
    <div ref={ref} className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-4">
        {stats.map((stat, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={
              inView
                ? { duration: 0.7, ease: "easeOut", delay: i * 0.15 }
                : { duration: 0.35, ease: "easeOut" }
            }
          >
            <span className="text-3xl sm:text-6xl lg:text-7xl font-black text-text-primary leading-none tracking-tighter">
              {stat.type === "count" ? (
                <>
                  <AnimatedNumber to={stat.value} inView={inView} />
                  {stat.suffix} {stat.label}
                </>
              ) : (
                stat.display
              )}
            </span>
          </motion.span>
        ))}
      </div>
    </div>
  )
}

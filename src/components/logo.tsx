"use client"

import { useEffect, useState } from "react"

export function Logo() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <span className="inline-flex items-baseline gap-[1px] font-mono text-base tracking-tight text-text-primary select-none">
      <span className="text-text-secondary">~/$ </span>
      oishik
      <span
        className={`inline-block w-[7px] h-[0.9em] bg-text-primary ml-[0.5px] align-middle transition-opacity ${mounted ? "animate-blink" : "opacity-100"}`}
      />
    </span>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SkyToggle } from "./sky-toggle"
import { Logo } from "./logo"
import { PfpSwitcher } from "./pfp-switcher"
import {
  Home,
  FolderOpen,
  Image,
  PenLine,
  Mail,
  User,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/#projects", label: "Projects", icon: FolderOpen },
  { href: "/gallery", label: "Spotlight", icon: Image },
  { href: "/blog", label: "Blog", icon: PenLine },
  { href: "/#contact", label: "Contact", icon: Mail },
]

const SECTION_TO_HASH: Record<string, string> = {
  hero: "",
  projects: "#projects",
  contact: "#contact",
}

export function Sidebar() {
  const pathname = usePathname()
  const [hash, setHash] = useState("")
  const skipObserve = useRef(false)

  useEffect(() => {
    const onHashChange = () => {
      const newHash = window.location.hash
      setHash(newHash)
      skipObserve.current = true
      setTimeout(() => { skipObserve.current = false }, 800)
    }
    setHash(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  useEffect(() => {
    if (pathname !== "/") return

    const observer = new IntersectionObserver(
      (entries) => {
        if (skipObserve.current) return
        let bestHash: string | null = null
        let bestRatio = 0
        for (const entry of entries) {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            const sectionId = entry.target.id
            const mapped = SECTION_TO_HASH[sectionId]
            if (mapped !== undefined) bestHash = mapped
          }
        }
        if (bestHash !== null) setHash(bestHash)
      },
      { threshold: [0.1, 0.2, 0.3, 0.4, 0.5] }
    )

    Object.keys(SECTION_TO_HASH).forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !hash
    if (!href.includes("#")) return pathname === href
    const [p, h] = href.split("#")
    return pathname === p && hash === `#${h}`
  }

  return (
    <>
      <aside className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 w-64 bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl z-50 flex-col justify-between py-8 px-6 shadow-xl shadow-black/5">
        <div className="flex items-center gap-3">
          <PfpSwitcher />
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
          >
            <Logo />
          </Link>
        </div>

        <nav className="flex flex-col gap-1 mt-8">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-4 py-3 text-sm transition-all rounded-xl",
                  active
                    ? "text-text-primary bg-white/20 dark:bg-white/10 font-medium shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/10 dark:hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                <span className="tracking-wide">{item.label}</span>
                {active && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-text-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-6">
          <SkyToggle />
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-4 inset-x-0 mx-auto w-max px-4 py-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl z-50 flex items-center gap-1 shadow-xl shadow-black/5">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors",
                active
                  ? "text-text-primary bg-white/20 dark:bg-white/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/10 dark:hover:bg-white/5"
              )}
            >
              <Icon size={18} />
              <span className="text-[10px] uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

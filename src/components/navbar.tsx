"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { SkyToggle } from "@/components/sky-toggle"
import { Logo } from "@/components/logo"
import { PfpSwitcher } from "@/components/pfp-switcher"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
]

const SECTION_TO_HASH: Record<string, string> = {
  hero: "",
  projects: "#projects",
  contact: "#contact",
}

export function Navbar() {
  const pathname = usePathname()
  const [hash, setHash] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
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

  // Scroll spy
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-base/80 backdrop-blur-lg border-b border-border-light"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <PfpSwitcher />
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
          >
            <Logo />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest transition-colors hover:text-text-primary",
                isActive(link.href)
                  ? "text-text-primary font-medium"
                  : "text-text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <SkyToggle />
        </div>

        <button
          className="md:hidden p-2 text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-base border-b border-border-light overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm uppercase tracking-widest transition-colors",
                    isActive(link.href)
                      ? "text-text-primary font-medium"
                      : "text-text-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <SkyToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

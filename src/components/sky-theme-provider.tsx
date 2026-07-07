"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type SkyTheme = "dawn" | "day" | "golden" | "night"

const THEME_KEY = "sky-theme"
const AUTO_KEY = "sky-theme-auto"

function getAutoTheme(): SkyTheme {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 8) return "dawn"
  if (hour >= 8 && hour < 17) return "day"
  if (hour >= 17 && hour < 20) return "golden"
  return "night"
}

interface SkyThemeContextType {
  theme: SkyTheme
  setTheme: (theme: SkyTheme) => void
  autoTheme: boolean
  setAutoTheme: (auto: boolean) => void
}

const SkyThemeContext = createContext<SkyThemeContextType | undefined>(undefined)

export function SkyThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SkyTheme>("day")
  const [autoTheme, setAutoThemeState] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(THEME_KEY)
    const savedAuto = localStorage.getItem(AUTO_KEY)
    if (savedAuto !== null) setAutoThemeState(savedAuto === "true")
    if (saved && savedAuto !== "true") {
      setThemeState(saved as SkyTheme)
    } else {
      setThemeState(getAutoTheme())
    }
  }, [])

  const setTheme = (t: SkyTheme) => {
    setThemeState(t)
    setAutoThemeState(false)
    localStorage.setItem(THEME_KEY, t)
    localStorage.setItem(AUTO_KEY, "false")
  }

  const setAutoTheme = (auto: boolean) => {
    setAutoThemeState(auto)
    localStorage.setItem(AUTO_KEY, String(auto))
    if (auto) setThemeState(getAutoTheme())
  }

  useEffect(() => {
    if (!autoTheme || !mounted) return
    const interval = setInterval(() => setThemeState(getAutoTheme()), 60000)
    return () => clearInterval(interval)
  }, [autoTheme, mounted])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.remove("theme-dawn", "theme-day", "theme-golden", "theme-night")
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme, mounted])

  return (
    <SkyThemeContext.Provider value={{ theme, setTheme, autoTheme, setAutoTheme }}>
      {children}
    </SkyThemeContext.Provider>
  )
}

export function useSkyTheme() {
  const ctx = useContext(SkyThemeContext)
  if (!ctx) throw new Error("useSkyTheme must be used within SkyThemeProvider")
  return ctx
}

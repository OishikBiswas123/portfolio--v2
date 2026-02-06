'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ReactNode, useEffect } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Clear any stored theme on mount to always start with light mode
  useEffect(() => {
    localStorage.removeItem('theme')
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  )
}

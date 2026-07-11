"use client"

import { useSkyTheme, type SkyTheme } from "./sky-theme-provider"
import { cn } from "@/lib/utils"
import { Sun, Moon, Sunrise, Sunset } from "lucide-react"

const themes: { id: SkyTheme; label: string; icon: typeof Sun }[] = [
  { id: "dawn", label: "Dawn", icon: Sunrise },
  { id: "day", label: "Day", icon: Sun },
  { id: "golden", label: "Golden", icon: Sunset },
  { id: "night", label: "Night", icon: Moon },
]

export function SkyToggle() {
  const { theme, setTheme, autoTheme, setAutoTheme } = useSkyTheme()

  return (
    <div className="flex flex-col items-center gap-1.5">
      {themes.map((t) => {
        const Icon = t.icon
        const isActive = theme === t.id
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
              isActive
                ? "bg-accent text-text-primary scale-110"
                : "text-text-secondary hover:text-text-primary hover:bg-accent",
            )}
            title={t.label}
          >
            <Icon size={15} />
          </button>
        )
      })}

      <div className="w-5 h-px bg-border-light my-1" />

      <button
        onClick={() => setAutoTheme(!autoTheme)}
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all duration-200 font-mono",
          autoTheme
            ? "bg-accent text-text-primary"
            : "text-text-secondary hover:text-text-primary hover:bg-accent",
        )}
        title={autoTheme ? "Auto (on)" : "Auto (off)"}
      >
        <span className="text-[11px]">A</span>
      </button>
    </div>
  )
}

"use client"

export function LightMotes() {
  return (
    <div
      className="absolute inset-0 z-[4] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 4,
            height: 4,
            background: "rgba(255,255,255,.95)",
            boxShadow: "0 0 7px 2px rgba(255,255,255,.5)",
            animation: `sfMote ${6 + Math.random() * 7}s linear infinite`,
            animationDelay: `${-Math.random() * 13}s`,
          }}
        />
      ))}
    </div>
  )
}

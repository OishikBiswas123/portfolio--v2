"use client"

const interests = [
  "🎙️ Voice Over",
  "🌿 Nature",
  "🎮 Gaming",
  "✍️ Writing Shayaris",
  "🎭 Acting & Modelling",
  "🎬 Movies & TV Series",
  "🥋 Martial Arts",
  "🎵 Music",
]

export function BeyondScreen() {
  return (
    <section className="py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 sm:px-16">
        <div className="text-center">
          <span className="text-sm uppercase tracking-[0.25em] text-text-primary font-semibold">
            Beyond the Screen
          </span>
          <p className="mt-3 text-lg text-text-secondary leading-relaxed max-w-md mx-auto">
            The passions that inspire my creativity beyond work.
          </p>
        </div>
      </div>

      <div
        className="mt-12"
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      >
        <div className="logos-rail w-full overflow-hidden">
          <div className="logos-track flex items-center w-max gap-[clamp(56px,8vw,112px)]">
            {[...interests, ...interests].map((item, i) => (
              <span
                key={i}
                className="text-xl sm:text-2xl font-medium text-text-primary whitespace-nowrap select-none"
                aria-hidden={i >= interests.length ? "true" : undefined}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .logos-rail {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .logos-track {
          animation: logosScroll 38s linear infinite;
        }
        .logos-rail:hover .logos-track {
          animation-play-state: paused;
        }
        @keyframes logosScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logos-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: auto;
            gap: 24px 48px;
          }
        }
      `}</style>
    </section>
  )
}

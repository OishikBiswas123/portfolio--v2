export function Meadow() {
  return (
    <div className="absolute left-[-2%] right-auto bottom-[-2%] w-[115%] pointer-events-none overflow-hidden select-none" style={{ zIndex: 3 }}>
      <img
        src="/meadow/meadow-panorama.jpg"
        alt=""
        className="block w-full h-auto"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
        }}
      />
    </div>
  )
}

"use client"

import { useRef, useEffect, useState } from "react"
import { useSkyTheme } from "./sky-theme-provider"

function parseCol(s: string): [number, number, number] | null {
  s = (s || "").trim()
  if (!s) return null
  if (s[0] === "#") {
    const n = parseInt(s.slice(1), 16)
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]
  }
  const m = s.match(/[\d.]+/g)
  if (!m || m.length < 3) return null
  return [(+m[0]) / 255, (+m[1]) / 255, (+m[2]) / 255]
}

export function SkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useSkyTheme()
  const [mounted, setMounted] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [])

  // WebGL cloud canvas
  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return

    const VERT = "attribute vec2 aPos; void main(){ gl_Position=vec4(aPos,0.0,1.0); }"
    const FRAG = [
      "precision highp float;",
      "uniform float uTime,uScroll,uNight;",
      "uniform vec2 uRes,uMouse;",
      "uniform vec3 uSky0,uSky1,uSky2,uSky3,uSun;",
      "float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }",
      "float noise(vec2 p){ vec2 i=floor(p),f=fract(p); vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);",
      " return mix(mix(hash(i+vec2(0.,0.)),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y); }",
      "float fbm(vec2 p){ float f=0.,a=0.5; mat2 R=mat2(0.80,0.60,-0.60,0.80); for(int i=0;i<5;i++){ f+=a*noise(p); p=R*p*2.02; a*=0.5; } return f; }",
      "float clouds(vec2 p,float c){ return smoothstep(1.0-c,1.0,fbm(p)); }",
      "vec3 skyGrad(float pos){ vec3 c=mix(uSky0,uSky1,smoothstep(0.0,0.38,pos)); c=mix(c,uSky2,smoothstep(0.38,0.74,pos)); c=mix(c,uSky3,smoothstep(0.74,1.0,pos)); return c; }",
      "void main(){",
      " vec2 res=uRes; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; float sv=gl_FragCoord.y/res.y;",
      " float t=uTime, alt=uScroll; vec3 sky=skyGrad(1.0-sv);",
      " vec2 wind=vec2(t*0.010,0.0)+uMouse*0.06; vec2 base=uv+wind;",
      " vec2 pn=base*2.3; pn.y+=alt*2.2 + uMouse.y*0.10; vec2 pf=base*1.25; pf.y+=alt*1.1;",
      " vec2 warp=vec2(fbm(pn*0.6+vec2(0.0,t*0.02)),fbm(pn*0.6+vec2(5.2,1.3))); vec2 pnw=pn+warp*0.6;",
      " vec2 sunDir=normalize(vec2(0.3,0.8));",
      " float df=clouds(pf,0.48); vec3 farCol=mix(vec3(0.80,0.84,0.92),vec3(0.97,0.98,1.0),0.5);",
      " float dn=clouds(pnw,0.52); float sh=clouds(pnw+sunDir*0.16,0.52);",
      " float lit=clamp(dn-sh*0.85+0.30,0.0,1.0);",
      " vec3 cloudLit=mix(vec3(1.00,0.99,0.97),uSun,0.18); vec3 cloudShadow=mix(vec3(0.60,0.64,0.74),uSky1,0.30);",
      " vec3 nearCol=mix(cloudShadow,cloudLit,lit);",
      " float nb=mix(1.0,0.55,uNight); farCol*=nb; nearCol*=nb;",
      " vec3 col=sky; col=mix(col,farCol,df*0.28); col=mix(col,nearCol,dn*0.80);",
      " col+=(hash(gl_FragCoord.xy)-0.5)/255.0; gl_FragColor=vec4(col,1.0);",
      "}"
    ].join("\n")

    const _ctx = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null
    if (!_ctx) return
    const gl: WebGLRenderingContext = _ctx

    const sh = (type: number, src: string) => {
      const o = gl.createShader(type)!
      gl.shaderSource(o, src)
      gl.compileShader(o)
      return o
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const b = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, b)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, "aPos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const U: Record<string, WebGLUniformLocation> = {}
    ;["uTime", "uScroll", "uRes", "uSky0", "uSky1", "uSky2", "uSky3", "uSun", "uNight", "uMouse"].forEach((n) => {
      U[n] = gl.getUniformLocation(prog, n)!
    })

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5)
    function resize() {
      const w = innerWidth, h = innerHeight
      canvas!.width = Math.floor(w * DPR)
      canvas!.height = Math.floor(h * DPR)
      gl.viewport(0, 0, canvas!.width, canvas!.height)
      gl.uniform2f(U.uRes, canvas!.width, canvas!.height)
    }
    addEventListener("resize", resize)
    resize()

    let skyColors: [number, number, number][] = [
      [0.13, 0.42, 0.72],
      [0.35, 0.58, 0.81],
      [0.55, 0.74, 0.90],
      [0.73, 0.86, 0.96],
    ]
    let sunColor: [number, number, number] = [1.0, 0.86, 0.55]
    let nightTarget = theme === "night" ? 1 : 0

    function readTOD() {
      const cs = getComputedStyle(document.documentElement)
      for (let i = 0; i < 4; i++) {
        const c = parseCol(cs.getPropertyValue(`--sky${i + 1}`))
        if (c) skyColors[i] = c
      }
      const sm = parseCol(cs.getPropertyValue("--sun-mid")) || parseCol(cs.getPropertyValue("--sun-core"))
      if (sm) sunColor = sm
      nightTarget = theme === "night" ? 1 : 0
    }
    readTOD()

    const todInterval = setInterval(readTOD, 200)

    let tmx = 0, tmy = 0, mx = 0, my = 0
    addEventListener("pointermove", (e: PointerEvent) => {
      tmx = (e.clientX / innerWidth) - 0.5
      tmy = (e.clientY / innerHeight) - 0.5
    }, { passive: true })

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    let cScroll = 0, night = theme === "night" ? 1 : 0, last = performance.now(), elapsed = 0, running = true

    function progress() {
      const max = Math.max(1, document.body.scrollHeight - innerHeight)
      return Math.min(1, (window.scrollY || window.pageYOffset || 0) / max)
    }

    function draw() {
      gl.uniform1f(U.uTime, elapsed)
      gl.uniform1f(U.uScroll, cScroll)
      gl.uniform1f(U.uNight, night)
      gl.uniform2f(U.uMouse, mx, my)
      gl.uniform3f(U.uSky0, skyColors[0][0], skyColors[0][1], skyColors[0][2])
      gl.uniform3f(U.uSky1, skyColors[1][0], skyColors[1][1], skyColors[1][2])
      gl.uniform3f(U.uSky2, skyColors[2][0], skyColors[2][1], skyColors[2][2])
      gl.uniform3f(U.uSky3, skyColors[3][0], skyColors[3][1], skyColors[3][2])
      gl.uniform3f(U.uSun, sunColor[0], sunColor[1], sunColor[2])
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    function loop(now: number) {
      if (!running) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      elapsed += dt
      cScroll += (progress() - cScroll) * 0.06
      night += (nightTarget - night) * 0.05
      mx += (tmx - mx) * 0.05
      my += (tmy - my) * 0.05
      draw()
      requestAnimationFrame(loop)
    }

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden
      if (running) { last = performance.now(); requestAnimationFrame(loop) }
    })

    if (reduce) {
      cScroll = progress()
      night = nightTarget
      draw()
      addEventListener("scroll", () => { cScroll = progress(); draw() }, { passive: true })
    } else {
      requestAnimationFrame(loop)
    }

    return () => {
      running = false
      clearInterval(todInterval)
    }
  }, [mounted, theme])

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--sky1) 0%, var(--sky2) 38%, var(--sky3) 64%, var(--sky4) 84%, transparent 96%)",
        transition: "background 1.2s ease",
      }}
    >

      {/* Sun / Moon with glow + rays */}
      <div
        className="absolute top-[12%] right-[15%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          zIndex: 2,
          transform: `translate(calc(-50% + ${mouse.x * 8}px), calc(-50% + ${mouse.y * 4}px))`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full"
          style={{
            background: `radial-gradient(circle, var(--sun-glow) 0%, transparent 62%)`,
            animation: "glowPulse 4s ease-in-out infinite alternate",
          }}
        />
        {theme !== "night" && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px]"
            style={{
              background: `
                radial-gradient(42% 48% at 44% 40%, rgba(255,236,172,.30) 0%, rgba(255,236,172,0) 70%),
                radial-gradient(54% 40% at 60% 58%, rgba(255,212,138,.22) 0%, rgba(255,212,138,0) 72%),
                radial-gradient(46% 54% at 52% 58%, rgba(255,244,205,.26) 0%, rgba(255,244,205,0) 74%)
              `,
              filter: "blur(22px)",
              mixBlendMode: "soft-light",
              WebkitMaskImage: "radial-gradient(circle, black 8%, transparent 72%)",
              maskImage: "radial-gradient(circle, black 8%, transparent 72%)",
              animation: "raysSpin 90s linear infinite",
            }}
          />
        )}
        <div
          className="relative w-[140px] h-[140px] rounded-full"
          style={{
            background: `radial-gradient(circle, var(--sun-core) 0%, var(--sun-mid) 52%, rgba(251,194,59,0) 72%)`,
            animation: "sunFloat 4.5s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* WebGL procedural cloud canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-dvw h-dvh pointer-events-none"
        style={{ zIndex: 1 }}
      />

    </div>
  )
}

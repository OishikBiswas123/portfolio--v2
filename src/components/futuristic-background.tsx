'use client'

import { useEffect, useRef } from 'react'

export function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check if mobile
    const isMobile = window.innerWidth < 768

    let animationId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0
    let frameCount = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
      pulse: number
      pulseSpeed: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 0.5
        this.alpha = Math.random() * 0.5 + 0.3
        this.pulse = 0
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        
        const colors = ['#2563EB', '#7C3AED', '#0891B2', '#DB2777', '#059669']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1

        this.pulse += this.pulseSpeed
        this.alpha = 0.3 + Math.sin(this.pulse) * 0.2
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
        
        // Skip glow effect on mobile for performance
        if (!isMobile) {
          ctx.shadowBlur = 10
          ctx.shadowColor = this.color
          ctx.fill()
          ctx.shadowBlur = 0
        }
        
        ctx.globalAlpha = 1
      }
    }

    const initParticles = () => {
      particles = []
      // Much fewer particles on mobile
      const baseCount = isMobile ? 25 : 80
      const particleCount = Math.min(baseCount, (canvas!.width * canvas!.height) / 20000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas!.width, canvas!.height))
      }
    }

    const drawConnections = () => {
      if (!ctx) return
      
      const maxDistance = isMobile ? 100 : 150
      const maxConnections = isMobile ? 2 : 3
      
      for (let i = 0; i < particles.length; i++) {
        let connections = 0
        
        // Only check subset on mobile for performance
        const checkLimit = isMobile ? Math.min(i + 10, particles.length) : particles.length
        
        for (let j = i + 1; j < checkLimit; j++) {
          if (connections >= maxConnections) break
          
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.4
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
            connections++
          }
        }

        // Skip mouse connections on mobile
        if (!isMobile) {
          const dx = particles[i].x - mouseX
          const dy = particles[i].y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouseX, mouseY)
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const drawGrid = () => {
      if (!canvas || !ctx || isMobile) return // Skip grid on mobile
      
      const gridSize = 80
      const time = Date.now() * 0.001

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distFromMouse = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          )
          
          const maxDist = 300
          const brightness = distFromMouse < maxDist 
            ? (1 - distFromMouse / maxDist) * 0.3 
            : 0.1

          const pulse = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5
          
          ctx.fillStyle = `rgba(37, 99, 235, ${brightness * pulse})`
          ctx.fillRect(x - 1, y - 1, 2, 2)
        }
      }
    }

    const animate = () => {
      if (!canvas || !ctx) return
      
      frameCount++
      
      // Skip frames on mobile (run at 30fps instead of 60fps)
      if (isMobile && frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(animate)
        return
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawGrid()
      
      particles.forEach(particle => {
        particle.update(canvas!.width, canvas!.height)
        particle.draw(ctx!)
      })
      
      drawConnections()

      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

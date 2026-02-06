'use client'

import { useEffect, useRef } from 'react'

export function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0

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
        this.size = Math.random() * 3 + 1
        this.alpha = Math.random() * 0.5 + 0.3
        this.pulse = 0
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        
        // Use darker, more saturated colors for visibility on light backgrounds
        const colors = ['#2563EB', '#7C3AED', '#0891B2', '#DB2777', '#059669']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1

        // Pulse effect
        this.pulse += this.pulseSpeed
        this.alpha = 0.3 + Math.sin(this.pulse) * 0.2
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
        
        // Glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      }
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.min(100, (canvas!.width * canvas!.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas!.width, canvas!.height))
      }
    }

    const drawConnections = () => {
      if (!ctx) return
      
      const maxDistance = 150
      
      for (let i = 0; i < particles.length; i++) {
        let connections = 0
        
        for (let j = i + 1; j < particles.length; j++) {
          if (connections >= 3) break
          
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.6
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
            connections++
          }
        }

        // Connect to mouse
        const dx = particles[i].x - mouseX
        const dy = particles[i].y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const opacity = (1 - distance / 200) * 0.8
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouseX, mouseY)
          ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }
    }

    const drawGrid = () => {
      if (!canvas || !ctx) return
      
      const gridSize = 60
      const time = Date.now() * 0.001

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distFromMouse = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          )
          
          const maxDist = 300
          const brightness = distFromMouse < maxDist 
            ? (1 - distFromMouse / maxDist) * 0.5 
            : 0.15

          const pulse = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5
          
          ctx.fillStyle = `rgba(37, 99, 235, ${brightness * pulse})`
          ctx.fillRect(x - 1, y - 1, 2, 2)
        }
      }
    }

    const animate = () => {
      if (!canvas || !ctx) return
      
      // Clear canvas with transparent fade for trail effect
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

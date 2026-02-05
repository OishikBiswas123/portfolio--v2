'use client'

import { useEffect, useRef } from 'react'

export function TechGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 40
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw horizontal lines with wave distortion
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)'
        ctx.lineWidth = 1

        for (let x = 0; x <= canvas.width; x += 5) {
          const distFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          )
          const maxDist = Math.sqrt(
            Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)
          )
          const normalizedDist = distFromCenter / maxDist

          // Create wormhole distortion effect
          const wave = Math.sin((x / 100) + time * 2) * 20 * (1 - normalizedDist)
          const warp = Math.sin((y / 150) + time) * 30 * normalizedDist
          const perspective = Math.pow(normalizedDist, 2) * 50

          const yOffset = y + wave + warp + perspective

          if (x === 0) {
            ctx.moveTo(x, yOffset)
          } else {
            ctx.lineTo(x, yOffset)
          }
        }
        ctx.stroke()
      }

      // Draw vertical lines with wave distortion
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)'
        ctx.lineWidth = 1

        for (let y = 0; y <= canvas.height; y += 5) {
          const distFromCenter = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          )
          const maxDist = Math.sqrt(
            Math.pow(canvas.width / 2, 2) + Math.pow(canvas.height / 2, 2)
          )
          const normalizedDist = distFromCenter / maxDist

          // Create wormhole distortion effect
          const wave = Math.sin((y / 100) + time * 2) * 20 * (1 - normalizedDist)
          const warp = Math.cos((x / 150) + time) * 30 * normalizedDist
          const perspective = Math.pow(normalizedDist, 2) * 50

          const xOffset = x + wave + warp + perspective

          if (y === 0) {
            ctx.moveTo(xOffset, y)
          } else {
            ctx.lineTo(xOffset, y)
          }
        }
        ctx.stroke()
      }

      // Draw glowing center point (wormhole center)
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)')
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 200 + Math.sin(time * 3) * 20, 0, Math.PI * 2)
      ctx.fill()

      // Draw rotating particles around center
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.5) + (i * Math.PI / 4)
        const radius = 150 + Math.sin(time * 2 + i) * 30
        const px = centerX + Math.cos(angle) * radius
        const py = centerY + Math.sin(angle) * radius

        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw trails
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(px, py)
        ctx.stroke()
      }

      time += 0.01
      animationId = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'linear-gradient(135deg, rgba(241, 245, 249, 0.3) 0%, rgba(226, 232, 240, 0.3) 100%)'
      }}
    />
  )
}

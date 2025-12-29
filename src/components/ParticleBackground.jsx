import { useState, useEffect, useRef } from 'react'

// Particle class for background animation
class Particle {
    constructor(canvas) {
        this.canvas = canvas
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
    }

    update(mouseX, mouseY) {
        this.x += this.speedX
        this.y += this.speedY

        // Mouse interaction - particles move away from cursor
        if (mouseX && mouseY) {
            const dx = this.x - mouseX
            const dy = this.y - mouseY
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                const force = (100 - distance) / 100
                this.x += dx * force * 0.02
                this.y += dy * force * 0.02
            }
        }

        // Wrap around edges
        if (this.x < 0) this.x = this.canvas.width
        if (this.x > this.canvas.width) this.x = 0
        if (this.y < 0) this.y = this.canvas.height
        if (this.y > this.canvas.height) this.y = 0
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 38, 38, ${this.opacity})`
        ctx.fill()
    }
}

export default function ParticleBackground() {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const mouseRef = useRef({ x: null, y: null })
    const animationRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initParticles()
        }

        const initParticles = () => {
            particlesRef.current = []
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
            for (let i = 0; i < Math.min(particleCount, 100); i++) {
                particlesRef.current.push(new Particle(canvas))
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesRef.current.forEach((particle, index) => {
                particle.update(mouseRef.current.x, mouseRef.current.y)
                particle.draw(ctx)

                // Draw connections between nearby particles
                for (let j = index + 1; j < particlesRef.current.length; j++) {
                    const other = particlesRef.current[j]
                    const dx = particle.x - other.x
                    const dy = particle.y - other.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(other.x, other.y)
                        ctx.strokeStyle = `rgba(220, 38, 38, ${0.1 * (1 - distance / 120)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX
            mouseRef.current.y = e.clientY
        }

        const handleMouseLeave = () => {
            mouseRef.current.x = null
            mouseRef.current.y = null
        }

        resizeCanvas()
        animate()

        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    )
}

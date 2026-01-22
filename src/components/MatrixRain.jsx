import { useState, useEffect, useRef } from 'react'

export default function MatrixRain() {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')

        // Ergenekon themed characters (Turkish + cyber symbols)
        const chars = 'ERGENEKON01アイウエオカキクケコサシスセソタチツテト</>{}[]#$%&@!?★☆◆◇▲▽'.split('')

        let columns = []
        let drops = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            const fontSize = 14
            columns = Math.floor(canvas.width / fontSize)
            drops = Array(columns).fill(1)
        }

        const draw = () => {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = '#DC2626' // Ergenekon red
            ctx.font = '14px monospace'

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)]
                const x = i * 14
                const y = drops[i] * 14

                // Gradient effect - brighter at the head
                const opacity = Math.random() * 0.5 + 0.3
                ctx.fillStyle = `rgba(220, 38, 38, ${opacity})`
                ctx.fillText(char, x, y)

                // Reset drop to top with random chance
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }

                drops[i]++
            }

            animationRef.current = requestAnimationFrame(draw)
        }

        resizeCanvas()
        draw()

        window.addEventListener('resize', resizeCanvas)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-30"
            style={{ background: 'transparent' }}
        />
    )
}

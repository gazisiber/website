import { useState, useEffect, useRef, useCallback } from 'react'

export default function ErgenekonGame({ onClose }) {
    const canvasRef = useRef(null)
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30)
    const targetsRef = useRef([])
    const animationRef = useRef(null)

    // Game dimensions
    const GAME_WIDTH = 600
    const GAME_HEIGHT = 400

    // Target class
    class Target {
        constructor() {
            this.x = Math.random() * (GAME_WIDTH - 60) + 30
            this.y = Math.random() * (GAME_HEIGHT - 60) + 30
            this.size = Math.random() * 20 + 20
            this.speedX = (Math.random() - 0.5) * 4
            this.speedY = (Math.random() - 0.5) * 4
            this.type = Math.random() > 0.3 ? 'drone' : 'bonus' // 30% chance for bonus
            this.hit = false
            this.opacity = 1
        }

        update() {
            if (this.hit) {
                this.opacity -= 0.1
                this.size += 2
                return this.opacity > 0
            }

            this.x += this.speedX
            this.y += this.speedY

            // Bounce off walls
            if (this.x < this.size || this.x > GAME_WIDTH - this.size) this.speedX *= -1
            if (this.y < this.size || this.y > GAME_HEIGHT - this.size) this.speedY *= -1

            return true
        }

        draw(ctx) {
            ctx.save()
            ctx.globalAlpha = this.opacity

            if (this.type === 'drone') {
                // Draw drone (enemy)
                ctx.fillStyle = '#DC2626'
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()

                // Drone propellers
                ctx.strokeStyle = '#fff'
                ctx.lineWidth = 2
                for (let i = 0; i < 4; i++) {
                    const angle = (i * Math.PI / 2) + Date.now() / 100
                    ctx.beginPath()
                    ctx.moveTo(this.x, this.y)
                    ctx.lineTo(
                        this.x + Math.cos(angle) * this.size * 1.3,
                        this.y + Math.sin(angle) * this.size * 1.3
                    )
                    ctx.stroke()
                }

                // Center dot
                ctx.fillStyle = '#000'
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2)
                ctx.fill()
            } else {
                // Draw bonus (star)
                ctx.fillStyle = '#FFD700'
                this.drawStar(ctx, this.x, this.y, 5, this.size, this.size * 0.5)
            }

            ctx.restore()
        }

        drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
            let rot = Math.PI / 2 * 3
            let step = Math.PI / spikes

            ctx.beginPath()
            ctx.moveTo(cx, cy - outerRadius)

            for (let i = 0; i < spikes; i++) {
                let x = cx + Math.cos(rot) * outerRadius
                let y = cy + Math.sin(rot) * outerRadius
                ctx.lineTo(x, y)
                rot += step

                x = cx + Math.cos(rot) * innerRadius
                y = cy + Math.sin(rot) * innerRadius
                ctx.lineTo(x, y)
                rot += step
            }

            ctx.lineTo(cx, cy - outerRadius)
            ctx.closePath()
            ctx.fill()
        }

        isHit(clickX, clickY) {
            const dx = clickX - this.x
            const dy = clickY - this.y
            return Math.sqrt(dx * dx + dy * dy) < this.size
        }
    }

    // Initialize game
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')

        // Spawn initial targets
        for (let i = 0; i < 5; i++) {
            targetsRef.current.push(new Target())
        }

        // Game loop
        const gameLoop = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

            // Draw grid
            ctx.strokeStyle = 'rgba(220, 38, 38, 0.1)'
            ctx.lineWidth = 1
            for (let i = 0; i < GAME_WIDTH; i += 30) {
                ctx.beginPath()
                ctx.moveTo(i, 0)
                ctx.lineTo(i, GAME_HEIGHT)
                ctx.stroke()
            }
            for (let i = 0; i < GAME_HEIGHT; i += 30) {
                ctx.beginPath()
                ctx.moveTo(0, i)
                ctx.lineTo(GAME_WIDTH, i)
                ctx.stroke()
            }

            // Update and draw targets
            targetsRef.current = targetsRef.current.filter(target => {
                const alive = target.update()
                if (alive) target.draw(ctx)
                return alive
            })

            // Spawn new targets occasionally
            if (Math.random() < 0.02 && targetsRef.current.length < 8) {
                targetsRef.current.push(new Target())
            }

            animationRef.current = requestAnimationFrame(gameLoop)
        }

        gameLoop()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    // Timer
    useEffect(() => {
        if (gameOver) return

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameOver(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [gameOver])

    // Handle clicks
    const handleClick = useCallback((e) => {
        if (gameOver) return

        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const scaleX = GAME_WIDTH / rect.width
        const scaleY = GAME_HEIGHT / rect.height
        const clickX = (e.clientX - rect.left) * scaleX
        const clickY = (e.clientY - rect.top) * scaleY

        targetsRef.current.forEach(target => {
            if (!target.hit && target.isHit(clickX, clickY)) {
                target.hit = true
                if (target.type === 'drone') {
                    setScore(prev => prev + 10)
                } else {
                    setScore(prev => prev + 50) // Bonus points
                }
            }
        })
    }, [gameOver])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-ergenekon-bright text-white rounded-full
                             flex items-center justify-center hover:bg-ergenekon-red transition-colors z-10"
                >
                    ✕
                </button>

                {/* Game container */}
                <div className="bg-black border-2 border-ergenekon-red rounded-xl overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.5)]">
                    {/* Header */}
                    <div className="bg-ergenekon-red/20 px-6 py-3 flex justify-between items-center border-b border-ergenekon-red/30">
                        <div className="font-orbitron text-white">
                            <span className="text-ergenekon-bright">ERGENEKON</span> DRONE HUNTER
                        </div>
                        <div className="flex gap-6 font-mono text-white">
                            <span>SKOR: <span className="text-ergenekon-bright">{score}</span></span>
                            <span>SÜRE: <span className={timeLeft <= 10 ? 'text-ergenekon-bright animate-pulse' : ''}>{timeLeft}s</span></span>
                        </div>
                    </div>

                    {/* Game canvas */}
                    <canvas
                        ref={canvasRef}
                        width={GAME_WIDTH}
                        height={GAME_HEIGHT}
                        onClick={handleClick}
                        className="cursor-crosshair"
                    />

                    {/* Game over overlay */}
                    {gameOver && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
                            <h2 className="font-orbitron text-4xl text-ergenekon-bright mb-4">OYUN BİTTİ!</h2>
                            <p className="font-mono text-white text-2xl mb-6">Final Skor: <span className="text-ergenekon-bright">{score}</span></p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        setScore(0)
                                        setTimeLeft(30)
                                        setGameOver(false)
                                        targetsRef.current = []
                                    }}
                                    className="px-6 py-3 bg-ergenekon-bright text-white font-orbitron rounded-lg
                                             hover:bg-ergenekon-red hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all"
                                >
                                    TEKRAR OYNA
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-black/50 border border-ergenekon-red text-white font-orbitron rounded-lg
                                             hover:bg-ergenekon-red/20 transition-all"
                                >
                                    KAPAT
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="bg-ergenekon-red/10 px-6 py-2 text-center border-t border-ergenekon-red/30">
                        <p className="font-mono text-xs text-white/60">
                            🎯 Düşman drone'ları vur (+10) | ⭐ Bonus yıldızları yakala (+50)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

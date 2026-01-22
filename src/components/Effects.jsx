import { useState, useEffect, useRef } from 'react'

// Text scramble effect hook
export function useTextScramble(text, trigger = true, duration = 2000) {
    const [displayText, setDisplayText] = useState('')
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}[]<>/\\|'

    useEffect(() => {
        if (!trigger) {
            setDisplayText(text)
            return
        }

        let iteration = 0
        const finalText = text
        const interval = duration / (text.length * 3)

        const scrambleInterval = setInterval(() => {
            setDisplayText(prev => {
                return finalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return finalText[index]
                        }
                        if (char === ' ') return ' '
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join('')
            })

            if (iteration >= finalText.length) {
                clearInterval(scrambleInterval)
            }

            iteration += 1 / 3
        }, interval)

        return () => clearInterval(scrambleInterval)
    }, [text, trigger, duration])

    return displayText
}

// Text Scramble component
export function ScrambleText({ text, className, delay = 0, duration = 2000 }) {
    const [trigger, setTrigger] = useState(false)
    const displayText = useTextScramble(text, trigger, duration)

    useEffect(() => {
        const timer = setTimeout(() => setTrigger(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    return <span className={className}>{displayText}</span>
}

// Konami Code hook
export function useKonamiCode(callback) {
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ]
    const currentSequence = useRef([])

    useEffect(() => {
        const handleKeyDown = (e) => {
            currentSequence.current.push(e.code)

            // Keep only the last N keys (length of konami code)
            if (currentSequence.current.length > konamiCode.length) {
                currentSequence.current.shift()
            }

            // Check if sequence matches
            if (currentSequence.current.join(',') === konamiCode.join(',')) {
                callback()
                currentSequence.current = []
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [callback])
}

// 3D Tilt effect hook
export function useTilt(ref, options = {}) {
    const { max = 15, scale = 1.02, speed = 400 } = options

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const rotateX = ((y - centerY) / centerY) * -max
            const rotateY = ((x - centerX) / centerX) * max

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
            element.style.transition = `transform ${speed / 4}ms ease-out`
        }

        const handleMouseLeave = () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
            element.style.transition = `transform ${speed}ms ease-out`
        }

        element.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            element.removeEventListener('mousemove', handleMouseMove)
            element.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [ref, max, scale, speed])
}

// Tilt Card wrapper component
export function TiltCard({ children, className, max = 10, scale = 1.02 }) {
    const cardRef = useRef(null)
    useTilt(cardRef, { max, scale })

    return (
        <div ref={cardRef} className={className} style={{ transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    )
}

// Ripple button effect
export function RippleButton({ children, className, onClick, ...props }) {
    const [ripples, setRipples] = useState([])

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const size = Math.max(rect.width, rect.height) * 2

        const newRipple = { x, y, size, id: Date.now() }
        setRipples(prev => [...prev, newRipple])

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id))
        }, 600)

        if (onClick) onClick(e)
    }

    return (
        <button className={`relative overflow-hidden ${className}`} onClick={handleClick} {...props}>
            {children}
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                    style={{
                        left: ripple.x - ripple.size / 2,
                        top: ripple.y - ripple.size / 2,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                />
            ))}
        </button>
    )
}

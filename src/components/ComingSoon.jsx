import { useState, useEffect, useRef } from 'react'
import { heroContent, teamContact } from '../data/content'
import ParticleBackground from './ParticleBackground'
import ErgenekonGame from './ErgenekonGame'
import { useKonamiCode } from './Effects'

const ComingSoon = () => {
    const [dots, setDots] = useState('')
    const [logoClicks, setLogoClicks] = useState(0)
    const [showGame, setShowGame] = useState(false)
    const [konamiActivated, setKonamiActivated] = useState(false)
    const clickTimeoutRef = useRef(null)

    // Animated dots for loading text
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
        }, 500)
        return () => clearInterval(interval)
    }, [])

    // Logo click easter egg handler
    const handleLogoClick = () => {
        const newCount = logoClicks + 1
        setLogoClicks(newCount)

        // Reset counter after 2 seconds of no clicks
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current)
        }
        clickTimeoutRef.current = setTimeout(() => {
            setLogoClicks(0)
        }, 2000)

        // Show game on 4th click
        if (newCount >= 4) {
            setShowGame(true)
            setLogoClicks(0)
        }
    }

    // Konami code easter egg
    useKonamiCode(() => {
        setKonamiActivated(true)
        setTimeout(() => setKonamiActivated(false), 5000)
    })

    return (
        <div className={`min-h-screen bg-ergenekon-dark relative overflow-x-hidden ${konamiActivated ? 'animate-pulse' : ''}`}>
            {/* Particle Background */}
            <ParticleBackground />

            {/* Easter Egg Game */}
            {showGame && <ErgenekonGame onClose={() => setShowGame(false)} />}

            {/* Konami Code Overlay */}
            {konamiActivated && (
                <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
                    <div className="text-6xl md:text-8xl font-orbitron text-ergenekon-bright animate-bounce text-shimmer">
                        ERGENEKON MODE!
                    </div>
                </div>
            )}

            {/* Hero Section with Enhanced Animations */}
            <section
                className="relative min-h-screen flex items-center justify-center bg-hero-pattern 
                     bg-cover bg-center bg-no-repeat"
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-ergenekon-dark/80 via-ergenekon-dark/60 to-ergenekon-dark" />

                {/* Red Glow Effect - Animated */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] 
                        bg-ergenekon-red/20 blur-[120px] rounded-full animate-pulse-slow" />

                {/* Scanlines Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="scanlines"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 section-container text-center">
                    {/* Logo - Easter Egg Trigger */}
                    <div className="mb-6 flex justify-center relative">
                        <img
                            src="/images/logo-full.png"
                            alt="Ergenekon Logo"
                            onClick={handleLogoClick}
                            className="w-64 md:w-80 mx-auto animate-pulse-slow hover:scale-110 hover:rotate-3 
                                     transition-all duration-700 ease-out cursor-pointer
                                     drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]
                                     hover:drop-shadow-[0_0_50px_rgba(220,38,38,0.9)]"
                        />
                        {/* Click counter badge */}
                        {logoClicks > 0 && (
                            <div className="absolute -top-2 -right-2 bg-ergenekon-bright text-white 
                                          font-bold rounded-full w-8 h-8 flex items-center justify-center 
                                          text-sm animate-bounce shadow-lg">
                                {logoClicks}
                            </div>
                        )}
                    </div>

                    {/* Subtitle - Bold White with Glow */}
                    <p className="font-exo text-white font-bold text-sm md:text-base tracking-[0.3em] 
                        uppercase mb-4 animate-fade-in
                        drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]
                        hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]
                        hover:tracking-[0.4em] transition-all duration-300 cursor-default">
                        {heroContent.subtitle}
                    </p>

                    {/* Main Title - Smooth Glow Animation */}
                    <div className="mb-4 sm:mb-6 px-4">
                        <h1
                            className="title-glow font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                                     font-bold text-white tracking-tight
                                     hover:tracking-widest transition-all duration-500 cursor-default
                                     inline-block animate-fade-in"
                        >
                            <span className="text-ergenekon-bright drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]
                                         hover:drop-shadow-[0_0_35px_rgba(220,38,38,1)] transition-all duration-300">
                                ERGENEKON
                            </span>{' '}
                            <span className="text-white hover:text-ergenekon-silver transition-colors duration-300">R&D TEAM</span>
                        </h1>
                    </div>

                    {/* Typewriter Description */}
                    <div className="mb-4 sm:mb-6 px-4">
                        <h2 className="typewriter font-exo text-base sm:text-xl md:text-2xl text-ergenekon-silver font-bold
                                     hover:text-white hover:tracking-wider transition-all duration-300 cursor-default">
                            {'<'} Dijital Dünyada Güvenli bir gelecek için {'/>'}
                        </h2>
                    </div>

                    {/* Coming Soon Badge - Pulsing */}
                    <div className="mb-8">
                        <p className="font-orbitron text-2xl md:text-3xl font-bold text-ergenekon-bright 
                                    uppercase tracking-widest mb-3
                                    drop-shadow-[0_0_15px_rgba(220,38,38,0.7)]
                                    hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(220,38,38,1)]
                                    transition-all duration-300 cursor-default">
                            SİTEMİZ YAKINDA GELECEK
                        </p>
                        <p className="font-mono text-white/90 text-sm md:text-base uppercase tracking-widest font-bold
                                    hover:text-white hover:tracking-[0.3em] transition-all duration-300 cursor-default">
                            SYSTEM INITIALIZING{dots}
                        </p>
                    </div>

                    {/* Social Icons Row - Linktree, LinkedIn, Instagram */}
                    <div className="flex gap-6 justify-center mb-6">
                        {/* Linktree */}
                        <a
                            href={teamContact.linktree}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ergenekon-silver/40 hover:text-ergenekon-bright transition-colors duration-300"
                            aria-label="Linktree"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.89h1.294v4.776c0 .486-.404.89-.89.89H6.577a.898.898 0 0 1-.889-.891v-4.774H.992c-.728 0-1.214-.729-.89-1.377l6.96-12.627a1.065 1.065 0 0 1 1.863 0l2.913 5.585-3.885 7.042zm15.945 0l-6.96-12.627a1.065 1.065 0 0 0-1.862 0l-2.995 5.586 3.885 7.04c.081.164.081.326.081.487-.08.517-.529.897-1.052.89h-1.296v4.776c0 .486.405.89.89.89h2.914a.9.9 0 0 0 .892-.891v-4.774h4.612c.728 0 1.214-.729.89-1.377z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href={teamContact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ergenekon-silver/40 hover:text-ergenekon-bright transition-colors duration-300"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a
                            href={teamContact.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ergenekon-silver/40 hover:text-ergenekon-bright transition-colors duration-300"
                            aria-label="Instagram"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>

                    {/* Email */}
                    <div className="font-mono text-xs text-white/30 tracking-wider hover:text-ergenekon-bright/60 transition-colors duration-300 cursor-default">
                        info@teamergenekon.org
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 
                        bg-gradient-to-t from-ergenekon-dark to-transparent pointer-events-none" />
            </section>

            {/* Custom Styles */}
            <style jsx>{`
                .scanlines {
                    background-image: repeating-linear-gradient(
                        0deg,
                        rgba(220, 38, 38, 0.03) 0px,
                        transparent 1px,
                        transparent 2px,
                        rgba(220, 38, 38, 0.03) 3px
                    );
                    height: 100%;
                    width: 100%;
                }


                .title-glow {
                    animation: title-glow-pulse 3s ease-in-out infinite;
                }

                @keyframes title-glow-pulse {
                    0%, 100% {
                        filter: drop-shadow(0 0 10px rgba(220, 38, 38, 0.3));
                    }
                    50% {
                        filter: drop-shadow(0 0 25px rgba(220, 38, 38, 0.8));
                    }
                }


                .typewriter {
                    overflow: hidden;
                    border-right: 0.15em solid rgba(220, 38, 38, 0.8);
                    white-space: nowrap;
                    margin: 0 auto;
                    letter-spacing: 0.05em;
                    animation: typing-loop 8s steps(50, end) infinite, blink-caret 0.75s step-end infinite;
                    display: inline-block;
                }

                @keyframes typing-loop {
                    0%, 10% { max-width: 0; }
                    40%, 90% { max-width: 100%; }
                    100% { max-width: 0; }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent; }
                    50% { border-color: rgba(220, 38, 38, 0.8); }
                }
            `}</style>
        </div>
    )
}

export default ComingSoon

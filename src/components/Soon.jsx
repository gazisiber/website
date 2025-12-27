import { useState, useEffect, useRef } from 'react';
import WolfGame from './WolfGame';

export default function Soon() {
    const [dots, setDots] = useState('');
    const [wolves, setWolves] = useState([]);
    const wolfIdCounter = useRef(0);
    const [logoClicks, setLogoClicks] = useState(0);
    const [showGame, setShowGame] = useState(false);
    const clickTimeoutRef = useRef(null);

    // Animated dots for loading text
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Independent Wolf Spawner
    useEffect(() => {
        let timeoutId;

        const spawnWolf = () => {
            const id = wolfIdCounter.current++;
            const duration = 4; // Animation duration in seconds

            // Add new wolf
            setWolves(prev => [...prev, { id, duration }]);

            // Schedule removal after animation finishes
            setTimeout(() => {
                setWolves(prev => prev.filter(w => w.id !== id));
            }, duration * 1000);

            // Random delay for next wolf (0.5s to 3s)
            const nextSpawnDelay = Math.random() * 2500 + 500;
            timeoutId = setTimeout(spawnWolf, nextSpawnDelay);
        };

        // Start spawning
        timeoutId = setTimeout(spawnWolf, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    // Handle logo clicks for easter egg
    const handleLogoClick = () => {
        const newCount = logoClicks + 1;
        setLogoClicks(newCount);

        // Reset counter after 2 seconds of no clicks
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }
        clickTimeoutRef.current = setTimeout(() => {
            setLogoClicks(0);
        }, 2000);

        // Show game on 4th click
        if (newCount >= 4) {
            setShowGame(true);
            setLogoClicks(0);
        }
    };

    // Close game
    const closeGame = () => {
        setShowGame(false);
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="scanlines"></div>
            </div>

            <div className="relative z-10 text-center px-4">
                <div className="mb-2 flex justify-center">
                    <div className="relative">
                        <img
                            src="/images/logo.png"
                            alt="GaziSiber Logo"
                            onClick={handleLogoClick}
                            className="w-56 h-56 md:w-64 md:h-64 object-contain animate-pulse-slow hover:scale-110 hover:rotate-6 transition-all duration-500 cursor-pointer"
                        />
                        {logoClicks > 0 && (
                            <div className="absolute -top-4 -right-4 bg-white/90 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm animate-bounce">
                                {logoClicks}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <h1
                        className="glitch text-7xl md:text-9xl font-tech font-bold text-white tracking-tight hover:tracking-widest transition-all duration-500 inline-block cursor-default"
                        data-text="GAZISIBER"
                    >
                        GAZISIBER
                    </h1>
                </div>

                <div className="mb-4 flex justify-center">
                    <h2 className="typewriter text-2xl md:text-4xl font-mono text-white/90">
                        {'<'} CYBER_SECURITY_COMMUNITY {'/>'}
                    </h2>
                </div>

                <div className="mb-3">
                    <p className="text-2xl md:text-3xl font-tech font-bold text-white uppercase tracking-widest">
                        OUR SITE IS COMING SOON
                    </p>
                </div>

                <div className="font-mono text-white mb-2">
                    <p className="text-lg uppercase tracking-widest">
                        SYSTEM INITIALIZING{dots}
                    </p>
                </div>

                {/* Loading Bar with Independent Wolves */}
                <div className="max-w-lg mx-auto mb-6">
                    <div className="h-10 bg-white/20 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/10"></div>
                        {/* Wolf Container */}
                        <div className="absolute inset-0 w-full h-full">
                            {wolves.map((wolf) => (
                                <img
                                    key={wolf.id}
                                    src="/images/loading_logo.png"
                                    alt="Loading"
                                    className="h-12 object-contain absolute top-1/2 -translate-y-1/2 wolf-run"
                                    style={{ animationDuration: `${wolf.duration}s` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <span className="text-4xl font-mono text-white animate-pulse">_</span>
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 z-10">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex gap-6">
                        <a href="https://linktr.ee/gazisiber" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Linktree">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.89h1.294v4.776c0 .486-.404.89-.89.89H6.577a.898.898 0 0 1-.889-.891v-4.774H.992c-.728 0-1.214-.729-.89-1.377l6.96-12.627a1.065 1.065 0 0 1 1.863 0l2.913 5.585-3.885 7.042zm15.945 0l-6.96-12.627a1.065 1.065 0 0 0-1.862 0l-2.995 5.586 3.885 7.04c.081.164.081.326.081.487-.08.517-.529.897-1.052.89h-1.296v4.776c0 .486.405.89.89.89h2.914a.9.9 0 0 0 .892-.891v-4.774h4.612c.728 0 1.214-.729.89-1.377z" />
                            </svg>
                        </a>

                        <a href="https://www.instagram.com/gazisiberorg/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>

                        <a href="https://www.linkedin.com/company/gazisiberorg/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>

                    <div className="font-mono text-xs text-white/30 tracking-wider">
                        info@gazisiber.org
                    </div>
                </div>
            </div>

            {/* Wolf Game Easter Egg */}
            {showGame && <WolfGame onClose={closeGame} />}

            <style jsx>{`
        .scanlines {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 3px
          );
          height: 100%;
          width: 100%;
        }

        .glitch::before {
          text-shadow: -2px 0 rgba(255, 255, 255, 0.7);
        }
        
        .glitch::after {
          text-shadow: 2px 0 rgba(255, 255, 255, 0.5);
        }

        .wolf-run {
          animation: wolfRun linear forwards;
        }

        @keyframes wolfRun {
          0% {
            left: -50px;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
        </div>
    );
}

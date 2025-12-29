import { heroContent } from '../data/content'
import ParticleBackground from './ParticleBackground'

const Hero = () => {
    const scrollToNext = () => {
        const nextSection = document.querySelector('#about')
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center bg-hero-pattern 
                 bg-cover bg-center bg-no-repeat"
        >
            {/* Particle Background */}
            <ParticleBackground />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-ergenekon-dark/80 via-ergenekon-dark/60 to-ergenekon-dark" />

            {/* Red Glow Effect - Animated */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] 
                    bg-ergenekon-red/20 blur-[120px] rounded-full animate-pulse-slow" />

            {/* Content */}
            <div className="relative z-10 section-container text-center">
                {/* Logo */}
                <img
                    src="/images/logo-full.png"
                    alt="Ergenekon Logo"
                    className="w-48 sm:w-64 md:w-80 mx-auto mb-4 sm:mb-6 animate-pulse-slow hover:scale-110 hover:rotate-3 
                             transition-all duration-700 ease-out cursor-pointer
                             drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]
                             hover:drop-shadow-[0_0_50px_rgba(220,38,38,0.9)]"
                />

                {/* Subtitle */}
                <p className="font-exo text-white font-bold text-xs sm:text-sm md:text-base tracking-[0.3em] 
                    uppercase mb-3 sm:mb-4 animate-fade-in px-4
                    drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]
                    hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]
                    hover:tracking-[0.4em] transition-all duration-300 cursor-default">
                    {heroContent.subtitle}
                </p>

                {/* Main Title - Glow Animation */}
                <h1 className="title-glow font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 
                             font-bold text-white mb-4 sm:mb-6 tracking-tight px-4
                             transition-all duration-500 ease-out
                             hover:tracking-widest cursor-default
                             group">
                    {heroContent.title.split(' ').map((word, index) => (
                        <span
                            key={index}
                            className={`inline-block transition-all duration-300 
                                      ${index === 0
                                    ? 'text-ergenekon-bright drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] hover:drop-shadow-[0_0_35px_rgba(220,38,38,1)]'
                                    : 'text-white hover:text-ergenekon-silver'}`}
                        >
                            {word}{' '}
                        </span>
                    ))}
                </h1>

                {/* Description */}
                <p className="font-exo text-ergenekon-silver text-base sm:text-lg md:text-xl max-w-2xl mx-auto 
                    mb-8 sm:mb-10 leading-relaxed font-bold px-4
                    hover:text-white transition-colors duration-300">
                    {heroContent.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4">
                    {/* Primary Button with Pulse Animation */}
                    <a
                        href="#projects"
                        className="relative min-w-[180px] px-8 py-3 
                                 bg-ergenekon-bright text-white font-semibold rounded-lg 
                                 transition-all duration-300 ease-out
                                 hover:bg-ergenekon-red hover:shadow-[0_0_30px_rgba(220,38,38,0.7)]
                                 active:scale-95
                                 overflow-hidden group"
                    >
                        {/* Pulse Ring Animation */}
                        <span className="absolute inset-0 rounded-lg 
                                       animate-ping bg-ergenekon-bright/50
                                       pointer-events-none"
                            style={{ animationDuration: '2s' }} />

                        {/* Inner Glow */}
                        <span className="absolute inset-0 rounded-lg 
                                       bg-gradient-to-r from-transparent via-white/20 to-transparent
                                       opacity-0 group-hover:opacity-100
                                       transition-opacity duration-300" />

                        <span className="relative z-10">{heroContent.ctaPrimary}</span>
                    </a>

                    {/* Secondary Button */}
                    <a
                        href="#contact"
                        className="btn-secondary min-w-[180px]"
                    >
                        {heroContent.ctaSecondary}
                    </a>
                </div>

                {/* Scroll Indicator - Clickable */}
                <button
                    onClick={scrollToNext}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce
                             cursor-pointer hover:scale-110 transition-transform duration-300
                             focus:outline-none group"
                    aria-label="Scroll to next section"
                >
                    <svg
                        className="w-6 h-6 text-ergenekon-silver group-hover:text-ergenekon-bright
                                 transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 
                    bg-gradient-to-t from-ergenekon-dark to-transparent" />
        </section>
    )
}

export default Hero

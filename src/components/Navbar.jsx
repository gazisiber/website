import { useState, useEffect } from 'react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Hakkımızda', href: '#about' },
        { name: 'Ekip', href: '#team' },
        { name: 'Projeler', href: '#projects' },
        { name: 'İletişim', href: '#contact' },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-black/80 backdrop-blur-lg py-3 border-b border-ergenekon-red/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="section-container">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <img
                            src="/images/logo-full.png"
                            alt="Ergenekon R&D Team Logo"
                            className="h-14 md:h-16 transition-transform duration-300 group-hover:scale-105"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-exo font-bold text-ergenekon-silver hover:text-ergenekon-bright 
                                         transition-colors duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ergenekon-bright 
                                               transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-ergenekon-silver hover:text-ergenekon-bright 
                                 transition-colors duration-300 relative z-50"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu - Slide from Right */}
                <div
                    className={`md:hidden fixed top-0 right-0 h-screen w-64 
                              bg-black/95 backdrop-blur-xl
                              border-l border-ergenekon-red/30
                              transition-transform duration-500 ease-out
                              shadow-[-10px_0_30px_rgba(0,0,0,0.5)]
                              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{ top: 0 }}
                >
                    {/* Menu Header */}
                    <div className="p-6 border-b border-ergenekon-red/20">
                        <span className="font-orbitron text-ergenekon-bright text-sm tracking-widest">
                            MENÜ
                        </span>
                    </div>

                    {/* Menu Links */}
                    <div className="p-6 flex flex-col gap-2">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-exo font-bold text-ergenekon-silver hover:text-ergenekon-bright 
                                         transition-all duration-300 py-4 px-4
                                         border-b border-ergenekon-red/10 last:border-0
                                         hover:bg-ergenekon-red/10 hover:pl-6
                                         rounded-lg"
                                style={{
                                    transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                                    opacity: isMobileMenuOpen ? 1 : 0,
                                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(20px)'
                                }}
                            >
                                <span className="text-ergenekon-bright mr-2">{'>'}</span>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Menu Footer */}
                    <div className="absolute bottom-8 left-6 right-6">
                        <div className="flex items-center gap-2 text-xs text-ergenekon-silver/50">
                            <span className="w-2 h-2 rounded-full bg-ergenekon-bright animate-pulse" />
                            <span className="font-exo">Ergenekon R&D Team</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </div>
        </nav>
    )
}

export default Navbar

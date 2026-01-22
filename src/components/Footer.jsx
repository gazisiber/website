import { motion } from 'framer-motion'
import { teamContact } from '../data/content'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative pt-16 pb-8 overflow-hidden bg-black/50">
            {/* Top Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px 
                    bg-gradient-to-r from-transparent via-ergenekon-red to-transparent" />

            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] 
                    bg-ergenekon-red/10 blur-[100px] rounded-full" />

            <div className="section-container relative z-10">
                {/* Main Footer Content */}
                <motion.div
                    className="grid md:grid-cols-3 gap-12 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <img
                            src="/images/logo-full.png"
                            alt="Ergenekon R&D Team"
                            className="h-12 opacity-70 hover:opacity-100 transition-opacity duration-300"
                        />
                        <p className="font-exo text-ergenekon-silver/60 text-sm leading-relaxed">
                            Milli Savunma ve İleri Teknoloji için Yenilikçi, Yerli ve Milli Çözümler.
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-4">
                        <h3 className="font-orbitron text-lg font-semibold text-white">
                            Hızlı Linkler
                        </h3>
                        <div className="flex flex-col gap-2">
                            {['Hakkımızda', 'Projeler', 'İletişim'].map((link, index) => (
                                <a
                                    key={index}
                                    href={`#${link === 'Hakkımızda' ? 'about' : link === 'Projeler' ? 'projects' : 'contact'}`}
                                    className="font-exo text-ergenekon-silver/60 hover:text-ergenekon-bright 
                                             transition-colors duration-300 text-sm w-fit"
                                >
                                    <span className="text-ergenekon-red mr-2">›</span>
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social Column - Enhanced */}
                    <div className="space-y-4">
                        <h3 className="font-orbitron text-lg font-semibold text-white">
                            Bizi Takip Edin
                        </h3>
                        <div className="flex gap-4">
                            {/* LinkedIn - Enhanced Hover */}
                            <motion.a
                                href={teamContact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-sm
                                         border border-ergenekon-red/20 
                                         flex items-center justify-center 
                                         text-ergenekon-silver
                                         transition-all duration-300
                                         hover:text-ergenekon-bright hover:border-ergenekon-bright
                                         hover:bg-ergenekon-red/10
                                         hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </motion.a>

                            {/* Instagram - Enhanced Hover */}
                            <motion.a
                                href={teamContact.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-sm
                                         border border-ergenekon-red/20 
                                         flex items-center justify-center 
                                         text-ergenekon-silver
                                         transition-all duration-300
                                         hover:text-ergenekon-bright hover:border-ergenekon-bright
                                         hover:bg-ergenekon-red/10
                                         hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </motion.a>

                            {/* Email Icon */}
                            <motion.a
                                href={`mailto:${teamContact.email}`}
                                aria-label="Email"
                                className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-sm
                                         border border-ergenekon-red/20 
                                         flex items-center justify-center 
                                         text-ergenekon-silver
                                         transition-all duration-300
                                         hover:text-ergenekon-bright hover:border-ergenekon-bright
                                         hover:bg-ergenekon-red/10
                                         hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-ergenekon-red/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Logo watermark */}
                        <div className="flex items-center gap-4">
                            <img
                                src="/images/logo-symbol.png"
                                alt=""
                                className="h-6 opacity-30"
                            />
                            <p className="font-exo text-ergenekon-silver/40 text-sm">
                                © {currentYear} Ergenekon R&D Team. Tüm hakları saklıdır.
                            </p>
                        </div>
                        <p className="font-exo text-ergenekon-silver/30 text-xs">

                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

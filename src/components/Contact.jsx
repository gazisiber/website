import { motion } from 'framer-motion'
import { teamContact } from '../data/content'
import { useState } from 'react'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitted(true)
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setSubmitted(false), 3000)
        }, 1000)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    }

    return (
        <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
            {/* Network Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1" fill="#DC2626" />
                            <circle cx="0" cy="0" r="1" fill="#DC2626" />
                            <circle cx="100" cy="0" r="1" fill="#DC2626" />
                            <circle cx="0" cy="100" r="1" fill="#DC2626" />
                            <circle cx="100" cy="100" r="1" fill="#DC2626" />
                            <line x1="50" y1="50" x2="0" y2="0" stroke="#DC2626" strokeWidth="0.5" opacity="0.3" />
                            <line x1="50" y1="50" x2="100" y2="0" stroke="#DC2626" strokeWidth="0.5" opacity="0.3" />
                            <line x1="50" y1="50" x2="0" y2="100" stroke="#DC2626" strokeWidth="0.5" opacity="0.3" />
                            <line x1="50" y1="50" x2="100" y2="100" stroke="#DC2626" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#network)" />
                </svg>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] 
                          bg-ergenekon-red/10 blur-[150px] rounded-full -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] 
                          bg-ergenekon-red/5 blur-[120px] rounded-full" />

            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="text-ergenekon-bright">{'[ '}</span>
                        İletişime Geçin
                        <span className="text-ergenekon-bright">{' ]'}</span>
                    </h2>
                    <p className="font-exo text-ergenekon-silver max-w-2xl mx-auto">
                        Projelerimiz hakkında sorularınız mı var? Bizimle iletişime geçin.
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left - Contact Info */}
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Captain Info */}
                        <motion.div
                            className="glass-card p-6 rounded-xl"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-ergenekon-red/20 
                                              flex items-center justify-center
                                              border border-ergenekon-red/30">
                                    <svg className="w-8 h-8 text-ergenekon-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-orbitron text-xl font-bold text-white">
                                        {teamContact.name}
                                    </h3>
                                    <p className="font-exo text-ergenekon-bright text-sm">
                                        {teamContact.title}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Details */}
                        <motion.div className="space-y-4" variants={itemVariants}>
                            {/* Email */}
                            <a href={`mailto:${teamContact.email}`}
                                className="flex items-center gap-4 p-4 rounded-xl
                                        bg-black/30 border border-ergenekon-red/10
                                        hover:border-ergenekon-bright/50 hover:bg-black/50
                                        transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-lg bg-ergenekon-red/10 
                                              flex items-center justify-center
                                              group-hover:bg-ergenekon-red/20 transition-colors">
                                    <svg className="w-5 h-5 text-ergenekon-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-exo text-ergenekon-silver/60 text-xs uppercase tracking-wider">Email</p>
                                    <p className="font-exo text-white group-hover:text-ergenekon-bright transition-colors">
                                        {teamContact.email}
                                    </p>
                                </div>
                            </a>

                            {/* Location */}
                            <div className="flex items-center gap-4 p-4 rounded-xl
                                          bg-black/30 border border-ergenekon-red/10">
                                <div className="w-12 h-12 rounded-lg bg-ergenekon-red/10 
                                              flex items-center justify-center">
                                    <svg className="w-5 h-5 text-ergenekon-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-exo text-ergenekon-silver/60 text-xs uppercase tracking-wider">Konum</p>
                                    <p className="font-exo text-white">{teamContact.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Adınız"
                                    className="w-full bg-transparent border-b-2 border-ergenekon-silver/20 
                                             py-4 px-0 font-exo text-white placeholder-ergenekon-silver/40
                                             focus:outline-none focus:border-ergenekon-bright
                                             transition-colors duration-300"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email Adresiniz"
                                    className="w-full bg-transparent border-b-2 border-ergenekon-silver/20 
                                             py-4 px-0 font-exo text-white placeholder-ergenekon-silver/40
                                             focus:outline-none focus:border-ergenekon-bright
                                             transition-colors duration-300"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="relative">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    placeholder="Mesajınız"
                                    className="w-full bg-transparent border-b-2 border-ergenekon-silver/20 
                                             py-4 px-0 font-exo text-white placeholder-ergenekon-silver/40
                                             focus:outline-none focus:border-ergenekon-bright
                                             transition-colors duration-300 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative w-full py-4 bg-ergenekon-bright text-white 
                                         font-orbitron font-semibold rounded-lg
                                         transition-all duration-300
                                         hover:bg-ergenekon-red hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]
                                         disabled:opacity-50 disabled:cursor-not-allowed
                                         overflow-hidden group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Shimmer Effect */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                                               -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                <span className="relative z-10">
                                    {isSubmitting ? 'Gönderiliyor...' : submitted ? '✓ Gönderildi!' : 'Gönder'}
                                </span>
                            </motion.button>
                        </form>

                        {/* Success Message */}
                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 
                                         text-green-400 font-exo text-center"
                            >
                                Mesajınız başarıyla gönderildi!
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact

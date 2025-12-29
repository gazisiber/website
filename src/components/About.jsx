import { motion } from 'framer-motion'
import { aboutContent } from '../data/content'

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    }

    return (
        <section id="about" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] 
                    bg-ergenekon-red/10 blur-[150px] rounded-full -translate-y-1/2" />

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">
                            <span className="text-ergenekon-bright">{'< '}</span>
                            {aboutContent.title}
                            <span className="text-ergenekon-bright">{' />'}</span>
                        </h2>
                        <p className="font-exo text-ergenekon-silver text-lg leading-relaxed">
                            {aboutContent.text}
                        </p>

                        {/* Decorative Line */}
                        <div className="flex items-center gap-4 pt-4">
                            <div className="w-12 h-1 bg-ergenekon-bright rounded-full" />
                            <span className="font-orbitron text-ergenekon-bright text-sm tracking-wider">
                                SINCE 2024
                            </span>
                        </div>
                    </motion.div>

                    {/* Control Panel Style Stats Grid */}
                    <div className="relative">
                        {/* Control Panel Background */}
                        <div className="absolute inset-0 -m-4 rounded-2xl 
                                      bg-gradient-to-b from-transparent via-ergenekon-red/5 to-ergenekon-red/10
                                      border border-ergenekon-red/10" />

                        {/* Panel Header */}
                        <motion.div
                            className="relative mb-6 pb-4 border-b border-ergenekon-red/20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-ergenekon-red animate-pulse" />
                                    <span className="w-2 h-2 rounded-full bg-ergenekon-bright/50" />
                                    <span className="w-2 h-2 rounded-full bg-ergenekon-bright/30" />
                                </div>
                                <span className="font-orbitron text-xs text-ergenekon-bright/70 uppercase tracking-widest">
                                    Sistem Durumu: Aktif
                                </span>
                            </div>
                        </motion.div>

                        {/* Stats Grid with Staggered Animation */}
                        <motion.div
                            className="relative grid grid-cols-2 gap-4 md:gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {aboutContent.stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="group relative p-6 text-center
                                             bg-black/30 backdrop-blur-sm rounded-xl
                                             border border-ergenekon-red/20
                                             transition-all duration-300
                                             hover:border-ergenekon-bright/50
                                             hover:bg-black/50
                                             hover:shadow-[0_0_20px_rgba(139,0,0,0.3)]"
                                >
                                    {/* Stat Number - DEVASA */}
                                    <div className="font-orbitron text-5xl md:text-6xl font-bold 
                                                  text-ergenekon-red mb-2 
                                                  group-hover:text-ergenekon-bright
                                                  group-hover:scale-110 
                                                  transition-all duration-300
                                                  drop-shadow-[0_0_10px_rgba(139,0,0,0.5)]">
                                        {stat.number}
                                        <span className="text-ergenekon-bright text-2xl">+</span>
                                    </div>

                                    {/* Stat Label - Küçük, Gümüş, Uppercase */}
                                    <div className="font-exo text-ergenekon-silver/70 text-xs md:text-sm 
                                                  uppercase tracking-widest font-medium">
                                        {stat.label}
                                    </div>

                                    {/* Corner Indicator */}
                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full 
                                                  bg-ergenekon-bright/30 group-hover:bg-ergenekon-bright
                                                  transition-colors duration-300" />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Panel Footer */}
                        <motion.div
                            className="relative mt-6 pt-4 border-t border-ergenekon-red/20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                        >
                            <div className="flex items-center justify-between text-xs font-exo text-ergenekon-silver/50">
                                <span>Last Update: 2024</span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Online
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About

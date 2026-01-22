import { motion } from 'framer-motion'

const Partners = () => {
    const partners = [
        { name: "Gazi Üniversitesi", type: "Akademik" },
        { name: "TEKNOFEST", type: "Platform" },
        { name: "TÜBİTAK", type: "Destek" },
        { name: "T.C. Ulaştırma Bakanlığı", type: "Kamu" },
    ]

    return (
        <section className="py-12 relative overflow-hidden border-t border-b border-ergenekon-red/10">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ergenekon-red/5 to-transparent" />

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="font-orbitron text-sm text-ergenekon-silver/50 tracking-widest uppercase">
                        Paydaşlarımız ve Destekçilerimiz
                    </h3>
                </motion.div>

                {/* Partners Grid */}
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            className="text-center group cursor-default"
                            whileHover={{ scale: 1.05 }}
                        >
                            {/* Partner Name as Typography */}
                            <p className="font-orbitron text-lg md:text-xl text-ergenekon-silver/30 
                                        group-hover:text-ergenekon-silver/60 transition-colors duration-300
                                        tracking-wide">
                                {partner.name}
                            </p>
                            {/* Type Badge */}
                            <span className="inline-block mt-1 text-xs font-exo text-ergenekon-red/40 uppercase tracking-widest">
                                {partner.type}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Decorative Line */}
                <div className="mt-8 flex justify-center">
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-ergenekon-red/30 to-transparent" />
                </div>
            </div>
        </section>
    )
}

export default Partners

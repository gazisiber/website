import { motion, AnimatePresence } from 'framer-motion'

const ProjectDetail = ({ project, isOpen, onClose }) => {
    if (!project) return null

    const statusColors = {
        'Aktif Geliştirme': 'bg-green-500/20 text-green-400 border-green-500/30',
        'Tamamlandı': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'Planlama': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Prototip': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-auto"
                    >
                        <div className="min-h-full flex items-center justify-center p-4">
                            <div className="relative w-full max-w-4xl bg-ergenekon-dark/95 backdrop-blur-xl
                                          border border-ergenekon-red/30 rounded-2xl overflow-hidden
                                          shadow-[0_0_50px_rgba(139,0,0,0.3)]">

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full
                                             bg-black/50 border border-ergenekon-red/30
                                             flex items-center justify-center
                                             text-ergenekon-silver hover:text-white
                                             hover:border-ergenekon-bright
                                             transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Header with Image */}
                                <div className="relative h-48 md:h-64 bg-gradient-to-b from-ergenekon-red/20 to-ergenekon-dark">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-contain p-8"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ergenekon-dark via-transparent to-transparent" />

                                    {/* Category Badge */}
                                    <span className="absolute bottom-4 left-6 px-4 py-1.5 text-sm font-semibold 
                                                   bg-ergenekon-red/90 text-white rounded-full font-exo
                                                   border border-ergenekon-bright/30">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    {/* Title & Status Row */}
                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white">
                                            {project.title}
                                        </h2>
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                                            {project.status}
                                        </span>
                                        <span className="px-3 py-1 text-xs font-exo text-ergenekon-silver/60 
                                                       bg-black/30 rounded-full border border-ergenekon-red/10">
                                            {project.year}
                                        </span>
                                    </div>

                                    {/* Full Description */}
                                    <div className="mb-8">
                                        <h3 className="font-orbitron text-sm text-ergenekon-bright uppercase tracking-widest mb-3">
                                            Proje Hakkında
                                        </h3>
                                        <p className="font-exo text-ergenekon-silver leading-relaxed text-lg">
                                            {project.fullDescription}
                                        </p>
                                    </div>

                                    {/* Achievements */}
                                    {project.achievements && project.achievements.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="font-orbitron text-sm text-ergenekon-bright uppercase tracking-widest mb-4">
                                                Başarılar & Ödüller
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {project.achievements.map((achievement, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center gap-2 px-4 py-2
                                                                 bg-ergenekon-red/10 border border-ergenekon-red/30
                                                                 rounded-lg font-exo text-sm text-white"
                                                    >
                                                        <svg className="w-4 h-4 text-ergenekon-bright" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {achievement}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Back Button */}
                                    <div className="flex justify-center pt-4">
                                        <button
                                            onClick={onClose}
                                            className="px-8 py-3 bg-black/50 border border-ergenekon-red/30
                                                     text-ergenekon-silver font-exo rounded-lg
                                                     hover:border-ergenekon-bright hover:text-white
                                                     transition-all duration-300"
                                        >
                                            ← Projelere Dön
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ProjectDetail

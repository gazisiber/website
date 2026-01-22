import { motion } from 'framer-motion'
import { projects } from '../data/content'
import { useState } from 'react'
import ProjectDetail from './ProjectDetail'

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openProject = (project) => {
        setSelectedProject(project)
        setIsModalOpen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeProject = () => {
        setIsModalOpen(false)
        setSelectedProject(null)
        document.body.style.overflow = 'auto'
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    }

    return (
        <>
            <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
                {/* Background Glow - Left */}
                <div className="absolute top-1/4 left-0 w-[300px] h-[300px] 
                        bg-ergenekon-red/10 blur-[120px] rounded-full" />

                {/* Background Glow - Right */}
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] 
                        bg-ergenekon-red/5 blur-[150px] rounded-full" />

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
                            <span className="text-ergenekon-bright">{'{ '}</span>
                            Projelerimiz
                            <span className="text-ergenekon-bright">{' }'}</span>
                        </h2>
                        <p className="font-exo text-ergenekon-silver max-w-2xl mx-auto">
                            Savunma sanayii, uzay havacılık ve siber güvenlik alanlarında
                            geliştirdiğimiz yenilikçi projeler.
                        </p>
                    </motion.div>

                    {/* Projects Grid with Staggered Animation */}
                    <motion.div
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {projects.map((project) => (
                            <motion.article
                                key={project.id}
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                onClick={() => openProject(project)}
                                className="group relative bg-black/50 backdrop-blur-md border border-white/10 
                                           rounded-xl overflow-hidden cursor-pointer
                                           transition-all duration-300 ease-in-out
                                           hover:border-ergenekon-bright
                                           hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
                            >
                                {/* Holographic Shimmer Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                              transition-opacity duration-500 pointer-events-none
                                              bg-gradient-to-r from-transparent via-white/5 to-transparent
                                              -translate-x-full group-hover:translate-x-full
                                              transition-transform duration-1000" />

                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-b from-ergenekon-dark to-black/80">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-contain p-6
                                                 transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 
                                                  via-transparent to-transparent" />

                                    {/* Category Badge */}
                                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold 
                                                   bg-ergenekon-red/90 text-white rounded-full font-exo
                                                   border border-ergenekon-bright/30
                                                   shadow-[0_0_10px_rgba(139,0,0,0.5)]">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Project Info */}
                                <div className="p-6 relative">
                                    {/* Glow line at top */}
                                    <div className="absolute top-0 left-6 right-6 h-px 
                                                  bg-gradient-to-r from-transparent via-ergenekon-bright/50 to-transparent
                                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <h3 className="font-orbitron text-xl font-bold text-white mb-3 
                                                 group-hover:text-ergenekon-bright transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="font-exo text-ergenekon-silver/80 text-sm leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Read More Link */}
                                    <div className="mt-4 flex items-center gap-2 text-ergenekon-bright 
                                                  opacity-0 group-hover:opacity-100 transition-all duration-300
                                                  translate-x-0 group-hover:translate-x-2">
                                        <span className="font-exo text-sm font-medium">Detaylar</span>
                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Corner Accent */}
                                <div className="absolute top-0 right-0 w-16 h-16 
                                              bg-gradient-to-bl from-ergenekon-bright/20 to-transparent
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Project Detail Modal */}
            <ProjectDetail
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeProject}
            />
        </>
    )
}

export default Projects

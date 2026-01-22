import { motion, AnimatePresence } from 'framer-motion'
import { teamStructure } from '../data/content'
import { useState } from 'react'

const Team = () => {
    const [activeTab, setActiveTab] = useState('software')

    const tabLabels = {
        software: 'Yazılım',
        mechanics: 'Mekanik',
        electronics: 'Elektronik'
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    }

    return (
        <section id="team" className="py-20 md:py-32 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] 
                          bg-ergenekon-red/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] 
                          bg-ergenekon-red/10 blur-[150px] rounded-full" />

            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        <span className="text-ergenekon-bright">{'< '}</span>
                        Ekibimiz
                        <span className="text-ergenekon-bright">{' />'}</span>
                    </h2>
                    <p className="font-exo text-ergenekon-silver max-w-2xl mx-auto">
                        Yerli ve milli teknoloji için çalışan tutkulu ekibimiz.
                    </p>
                </motion.div>

                {/* SECTION 1: Leadership - Komuta Kademesi */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="font-orbitron text-lg text-ergenekon-bright text-center mb-8 tracking-widest uppercase">
                        Komuta Kademesi
                    </h3>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
                        {teamStructure.leadership.map((leader, index) => (
                            <motion.div
                                key={index}
                                className="relative w-full md:w-72 p-6 text-center
                                         bg-black/40 backdrop-blur-md rounded-2xl
                                         border-2 border-ergenekon-red/50
                                         hover:border-ergenekon-bright
                                         transition-all duration-300
                                         hover:shadow-[0_0_30px_rgba(139,0,0,0.4)]"
                                whileHover={{ scale: 1.02 }}
                            >
                                {/* Gold/Red accent corner */}
                                <div className="absolute top-0 left-0 w-8 h-8 
                                              border-t-2 border-l-2 border-yellow-500/50 rounded-tl-2xl" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 
                                              border-b-2 border-r-2 border-yellow-500/50 rounded-br-2xl" />

                                <div className="w-32 h-32 mx-auto mb-4 rounded-full 
                                              bg-ergenekon-red/20 border-2 border-ergenekon-red/40
                                              flex items-center justify-center overflow-hidden">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-28 h-28 object-cover rounded-full"
                                    />
                                </div>
                                <h4 className="font-orbitron text-white text-lg font-bold mb-1">
                                    {leader.name}
                                </h4>
                                <span className="inline-block px-3 py-1 text-xs font-exo 
                                               bg-ergenekon-red/20 text-ergenekon-bright 
                                               rounded-full border border-ergenekon-red/30">
                                    {leader.role}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* SECTION 2: Boards - Kurullar */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Audit Board */}
                    <div className="mb-10">
                        <h3 className="font-orbitron text-sm text-ergenekon-silver/70 text-center mb-6 tracking-widest uppercase">
                            Denetim Kurulu
                        </h3>
                        <div className="flex justify-center">
                            {teamStructure.auditBoard.map((member, index) => (
                                <div
                                    key={index}
                                    className="w-48 p-4 text-center bg-black/30 rounded-xl
                                             border border-ergenekon-red/20"
                                >
                                    <div className="w-24 h-24 mx-auto mb-3 rounded-full 
                                                  bg-ergenekon-panel border border-ergenekon-red/30 overflow-hidden">
                                        <img src={member.image} alt="" className="w-24 h-24 object-cover" />
                                    </div>
                                    <p className="font-exo text-white text-sm">{member.name}</p>
                                    <p className="font-exo text-ergenekon-silver/50 text-xs">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Management Board - 3x2 Grid */}
                    <div>
                        <h3 className="font-orbitron text-sm text-ergenekon-silver/70 text-center mb-6 tracking-widest uppercase">
                            Yönetim Kurulu
                        </h3>
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {teamStructure.managementBoard.map((member, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="p-4 text-center bg-black/30 rounded-xl
                                             border border-ergenekon-red/20
                                             hover:border-ergenekon-bright/50
                                             transition-all duration-300"
                                >
                                    <div className="w-24 h-24 mx-auto mb-3 rounded-full 
                                                  bg-ergenekon-panel border border-ergenekon-red/30 overflow-hidden">
                                        <img src={member.image} alt="" className="w-24 h-24 object-cover" />
                                    </div>
                                    <p className="font-exo text-white text-sm font-medium">{member.name}</p>
                                    <p className="font-exo text-ergenekon-silver/50 text-xs mt-1">YK Üyesi</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* SECTION 3: Sub-Teams with Tabs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="font-orbitron text-lg text-ergenekon-bright text-center mb-8 tracking-widest uppercase">
                        Teknik Ekipler
                    </h3>

                    {/* Tabs */}
                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                        {Object.keys(tabLabels).map((tabKey) => (
                            <button
                                key={tabKey}
                                onClick={() => setActiveTab(tabKey)}
                                className={`px-6 py-3 font-orbitron text-sm rounded-lg 
                                          transition-all duration-300
                                          ${activeTab === tabKey
                                        ? 'bg-ergenekon-bright text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                                        : 'bg-black/30 text-ergenekon-silver border border-ergenekon-red/20 hover:border-ergenekon-bright/50'
                                    }`}
                            >
                                {tabLabels[tabKey]}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[200px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
                            >
                                {teamStructure.subTeams[activeTab]?.map((member, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 text-center bg-black/40 backdrop-blur-sm rounded-xl
                                                 border border-ergenekon-red/10
                                                 hover:border-ergenekon-bright/30
                                                 transition-all duration-300"
                                    >
                                        <div className="w-20 h-20 mx-auto mb-3 rounded-full 
                                                      bg-ergenekon-red/10 border border-ergenekon-red/20 overflow-hidden">
                                            <img src={member.image} alt="" className="w-20 h-20 object-cover" />
                                        </div>
                                        <p className="font-exo text-white text-sm">{member.name}</p>
                                        <p className="font-exo text-ergenekon-silver/50 text-xs">{member.role}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Team

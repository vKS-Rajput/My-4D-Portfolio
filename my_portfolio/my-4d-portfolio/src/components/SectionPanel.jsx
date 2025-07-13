import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText.jsx'; // Ensure .jsx extension is correct

const SectionPanel = ({ section, onClose }) => {
    // Define content for each section
    const sectionContent = {
        Projects: (
            <div>
                <GlitchText className="text-3xl mb-6">🚀 Projects // Data Streams</GlitchText>
                <div className="space-y-6 mt-4">
                    {[
                        {
                            title: 'ReVastra',
                            desc: 'AI-based peer‑to‑peer clothing rental with quality checks, identity verification & monetization.',
                            tech: ['React', 'Node.js', 'TensorFlow', 'Solidity'],
                        },
                        {
                            title: 'TravelMate',
                            desc: 'AI‑powered trip planner with custom itineraries, maps, and bookings in one app.',
                            tech: ['Next.js', 'Python', 'OpenAI API', 'PostgreSQL'],
                        },
                        {
                            title: 'SkillBet',
                            desc: 'Compete in coding, trivia, or chess and bet skillfully to win the prize pool.',
                            tech: ['Unity', 'C#', 'Firebase', 'WebSockets'],
                        },
                        {
                            title: 'Quantum Ledger',
                            desc: 'Developed a secure, distributed ledger prototype using quantum-resistant cryptography.',
                            tech: ['Rust', 'Quantum Cryptography', 'Blockchain'],
                        },
                    ].map((proj, i) => (
                        <motion.div
                            key={proj.title}
                            initial={{ opacity: 0, y: 30, rotateX: -15 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                            whileHover={{ scale: 1.02, rotateY: 2, rotateX: 2, boxShadow: '0 0 30px rgba(147, 51, 234, 0.7)' }}
                            className="p-6 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-700 rounded-2xl shadow-xl backdrop-blur-sm
                                       relative overflow-hidden cursor-pointer transform-gpu transition-all duration-300 ease-in-out group" // Added group
                            style={{ transformStyle: 'preserve-3d' }} // Enable 3D transforms for children
                        >
                            {/* Inner glowing overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-cyan-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            <h3 className="text-2xl font-bold text-cyan-300 mb-2 relative z-10">{proj.title}</h3>
                            <p className="text-sm text-gray-200 leading-relaxed relative z-10">{proj.desc}</p>
                            <div className="mt-3 flex flex-wrap gap-2 relative z-10">
                                {proj.tech.map((tech, techIdx) => (
                                    <span key={techIdx} className="px-3 py-1 bg-purple-600/50 text-xs rounded-full text-white font-medium border border-purple-500">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),

        Experience: (
            <div>
                <GlitchText className="text-3xl mb-6">🧪 Experience Logs // Chrono-Records</GlitchText>
                <div className="space-y-6 mt-4">
                    {[
                        {
                            title: "ReVastra (Founder)",
                            time: "2024 - Present",
                            desc: "Spearheaded an AI-driven peer-to-peer clothing rental startup, focusing on robust monetization strategies, secure identity verification, and stringent quality assurance protocols. Leveraged full-stack development and machine learning for core features.",
                        },
                        {
                            title: "TravelMate (Full Stack Dev)",
                            time: "2023",
                            desc: "Engineered an intelligent AI trip planner from inception. Designed and implemented complex booking flows, integrated dynamic map systems, and developed sophisticated AI algorithms for personalized itinerary generation.",
                        },
                        {
                            title: "Game Dev Intern - VIT",
                            time: "2022",
                            desc: "Contributed to the design and development of educational open-world game prototypes. Implemented core gameplay mechanics, character controllers, and interactive environments using Unity and C#.",
                        },
                        {
                            title: "AI Prompt Engineer",
                            time: "Freelance",
                            desc: "Specialized in crafting multi-turn, context-aware prompts for advanced AI systems. Collaborated on projects involving AI support agents, intelligent product assistants, and immersive storytelling bots.",
                        }
                    ].map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 50, rotateY: -10 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                            whileHover={{ scale: 1.01, rotateY: 5, boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)' }}
                            className="p-6 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border border-cyan-600 rounded-xl shadow-xl backdrop-blur-sm
                                       relative overflow-hidden cursor-pointer transform-gpu transition-all duration-300 ease-in-out group" // Added group
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Inner glowing overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-800/10 to-purple-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            <h3 className="text-xl font-bold text-purple-300 mb-1 relative z-10">
                                {exp.title}
                                <span className="block text-sm text-cyan-400 font-normal mt-0.5">{exp.time}</span>
                            </h3>
                            <p className="text-gray-200 mt-2 text-sm leading-relaxed relative z-10">{exp.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),

        About: (
            <div>
                <GlitchText className="text-3xl mb-6">👨‍💻 About Me // Core Directive</GlitchText>
                <p className="mt-4 text-gray-200 leading-relaxed text-lg">
                    I am a full‑stack and AI developer with a deep-seated passion for crafting
                    <span className="text-cyan-300 font-semibold"> emotional, immersive, and futuristic digital experiences</span>.
                    My work blends cutting-edge technology with artistic vision, aiming to create interfaces that
                    transcend the ordinary and engage users on a multi-dimensional level. I thrive on
                    exploring the intersections of code, creativity, and consciousness.
                </p>
                <div className="mt-8 p-4 bg-purple-900/20 border border-purple-700 rounded-lg text-sm text-gray-300">
                    <p className="font-semibold text-purple-400 mb-2">Current Focus:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Advancing AI-driven interactive narratives</li>
                        <li>Exploring WebGL and Three.js for immersive web environments</li>
                        <li>Developing secure, scalable backend architectures</li>
                    </ul>
                </div>
            </div>
        ),

        Contact: (
            <div>
                <GlitchText className="text-3xl mb-6">📬 Contact // Interdimensional Relay</GlitchText>
                <p className="text-gray-200 leading-relaxed text-lg mb-6">
                    Ready to bridge dimensions? Connect with me through the following channels.
                    Your message will be routed through secure quantum entanglement protocols.
                </p>
                <div className="mt-4 space-y-4 text-gray-200 text-lg">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, color: '#00FFFF', boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
                        className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300"
                    >
                        <span className="text-3xl">📧</span>
                        <div>
                            <p className="font-semibold">Email:</p>
                            <a href="mailto:v.kishasinghrajput@gmail.com" className="text-cyan-300 hover:underline">v.kishasinghrajput@gmail.com</a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ scale: 1.05, color: '#9333EA', boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)' }}
                        className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300"
                    >
                        <span className="text-3xl">🔗</span>
                        <div>
                            <p className="font-semibold">LinkedIn:</p>
                            <a href="https://linkedin.com/in/vishwajeet" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:underline">linkedin.com/in/vishwajeet</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        ),
    };

    return (
        <AnimatePresence>
            {section && (
                <motion.div
  key={section}
  initial={{ x: '100%', opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: '100%', opacity: 0 }}
  transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }} // ✅ Fixed
                    className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-black/80 text-white z-40 p-8
                               backdrop-blur-xl shadow-2xl border-l-2 border-purple-500
                               overflow-y-auto custom-scrollbar relative" // Added relative for inner elements
                >
                    {/* Background grid animation */}
                    <div className="absolute inset-0 z-0 opacity-10"
                         style={{
                             background: `
                                linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(138,43,226,0.05) 1px, transparent 1px)
                             `,
                             backgroundSize: '20px 20px',
                             animation: 'panel-grid-pulse 8s infinite alternate ease-in-out'
                         }}
                    />

                    {/* Top-right corner accent glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/50 to-transparent rounded-bl-full blur-xl opacity-30 z-10" />

                    <button
                        onClick={onClose}
                        className="text-lg text-purple-400 hover:text-cyan-300 mb-8 transition-colors duration-300
                                   flex items-center gap-2 font-semibold group relative z-20" // Added relative z-index
                    >
                        <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: -5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                            <span className="text-2xl">🌌</span>
                        </motion.span>
                        <span className="border-b border-transparent group-hover:border-cyan-300 transition-colors duration-300">
                            Return to Nexus
                        </span>
                    </button>

                    <div className="relative z-20"> {/* Content wrapper with z-index */}
                        {sectionContent[section] || (
                            <p className="text-gray-400 text-center text-lg mt-10">
                                <GlitchText>ERROR: Dimension Not Found</GlitchText>
                            </p>
                        )}
                    </div>

                    {/* Subtle animated overlay for 4D effect allusion (bottom left) */}
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tr-full blur-xl opacity-20 animate-pulse-slow z-10"></div>

                    {/* Custom CSS for animations (add this to your global CSS file, e.g., index.css or global.css) */}
                    <style>{`
                        @keyframes panel-grid-pulse {
                            0%, 100% { opacity: 0.1; transform: scale(1); }
                            50% { opacity: 0.15; transform: scale(1.02); }
                        }
                        /* Ensure custom-scrollbar and pulse-slow are defined globally */
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SectionPanel;

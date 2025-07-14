import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from './GlitchText.jsx'; // Ensure .jsx extension is correct

const SectionPanel = ({ section, onClose }) => {
    // Define content for each section
    const sectionContent = {
        Projects: (
            <div>
                {/* Section title with GlitchText and electric-blue color */}
                <GlitchText className="text-3xl mb-6 text-electric-blue drop-shadow-[0_0_10px_#00eaff]">🚀 Projects // Data Streams</GlitchText>
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
                            // Enhanced hover effects with consistent color palette
                            whileHover={{
                                scale: 1.02,
                                rotateY: 2,
                                rotateX: 2,
                                boxShadow: '0 0 30px rgba(138, 43, 226, 0.7), 0 0 60px rgba(0, 234, 255, 0.4)' // Accent purple and electric blue
                            }}
                            className="p-6 bg-gradient-to-br from-accent-purple/30 to-electric-blue/30 border border-electric-blue rounded-2xl shadow-xl backdrop-blur-sm
                                       relative overflow-hidden cursor-pointer transform-gpu transition-all duration-300 ease-in-out group" // Added group
                            style={{ transformStyle: 'preserve-3d' }} // Enable 3D transforms for children
                        >
                            {/* Inner glowing overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-electric-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            {/* Project title with electric-blue text */}
                            <h3 className="text-2xl font-bold text-electric-blue mb-2 relative z-10 font-heading">{proj.title}</h3>
                            {/* Project description with refined text color */}
                            <p className="text-sm text-gray-300 leading-relaxed relative z-10 font-sans">{proj.desc}</p>
                            <div className="mt-3 flex flex-wrap gap-2 relative z-10">
                                {/* Tech tags with accent-purple styling */}
                                {proj.tech.map((tech, techIdx) => (
                                    <span key={techIdx} className="px-3 py-1 bg-accent-purple/50 text-xs rounded-full text-white font-medium border border-accent-purple font-mono">
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
                {/* Section title with GlitchText and electric-blue color */}
                <GlitchText className="text-3xl mb-6 text-electric-blue drop-shadow-[0_0_10px_#00eaff]">🧪 Experience Logs // Chrono-Records</GlitchText>
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
                        // Added a new experience entry
                            title: "AI & WebGL Research - Quantum Labs",
                            time: "2022-2023",
                            desc: "Conducted research on integrating advanced AI models with real-time 3D web environments using WebGL and Three.js, focusing on dynamic data visualization and interactive simulations.",
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
                            // Enhanced hover effects with consistent color palette
                            whileHover={{
                                scale: 1.01,
                                rotateY: 5,
                                boxShadow: '0 0 25px rgba(0, 234, 255, 0.5), 0 0 50px rgba(138, 43, 226, 0.3)' // Electric blue and accent purple
                            }}
                            className="p-6 bg-gradient-to-br from-electric-blue/30 to-accent-purple/30 border border-electric-blue rounded-xl shadow-xl backdrop-blur-sm
                                       relative overflow-hidden cursor-pointer transform-gpu transition-all duration-300 ease-in-out group" // Added group
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Inner glowing overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            {/* Experience title with accent-magenta text */}
                            <h3 className="text-xl font-bold text-accent-magenta mb-1 relative z-10 font-heading">
                                {exp.title}
                                {/* Time span with electric-blue text */}
                                <span className="block text-sm text-electric-blue font-normal mt-0.5 font-sans">{exp.time}</span>
                            </h3>
                            {/* Experience description with refined text color */}
                            <p className="text-gray-300 mt-2 text-sm leading-relaxed relative z-10 font-sans">{exp.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),

        About: (
            <div>
                {/* Section title with GlitchText and electric-blue color */}
                <GlitchText className="text-3xl mb-6 text-electric-blue drop-shadow-[0_0_10px_#00eaff]">👨‍💻 About Me // Core Directive</GlitchText>
                {/* About text with refined text color and electric-blue accent */}
                <p className="mt-4 text-gray-300 leading-relaxed text-lg font-sans">
                    I am a full‑stack and AI developer with a deep-seated passion for crafting
                    <span className="text-electric-blue font-semibold"> emotional, immersive, and futuristic digital experiences</span>.
                    My work blends cutting-edge technology with artistic vision, aiming to create interfaces that
                    transcend the ordinary and engage users on a multi-dimensional level. I thrive on
                    exploring the intersections of code, creativity, and consciousness.
                </p>
                {/* Current focus box with accent-purple styling */}
                <div className="mt-8 p-4 bg-accent-purple/20 border border-accent-purple rounded-lg text-sm text-gray-300 font-sans">
                    <p className="font-semibold text-accent-purple mb-2">Current Focus:</p>
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
                {/* Section title with GlitchText and electric-blue color */}
                <GlitchText className="text-3xl mb-6 text-electric-blue drop-shadow-[0_0_10px_#00eaff]">📬 Contact // Interdimensional Relay</GlitchText>
                {/* Contact intro text with refined color */}
                <p className="text-gray-300 leading-relaxed text-lg mb-6 font-sans">
                    Ready to bridge dimensions? Connect with me through the following channels.
                    Your message will be routed through secure quantum entanglement protocols.
                </p>
                <div className="mt-4 space-y-4 text-gray-300 text-lg">
                    {/* Email Contact Card */}
                    <motion.a // Changed div to a for semantic linking
                        href="mailto:v.kishasinghrajput@gmail.com"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        // Enhanced hover effects with electric-blue glow
                        whileHover={{ scale: 1.03, color: '#00EAFF', boxShadow: '0 0 20px rgba(0, 234, 255, 0.4)' }}
                        className="p-4 bg-gradient-to-r from-electric-blue/30 to-accent-purple/30 border border-electric-blue rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 font-sans"
                    >
                        <span className="text-3xl">📧</span>
                        <div>
                            <p className="font-semibold text-white">Email:</p>
                            <span className="text-electric-blue hover:underline">v.kishasinghrajput@gmail.com</span>
                        </div>
                    </motion.a>
                    {/* LinkedIn Contact Card */}
                    <motion.a // Changed div to a for semantic linking
                        href="https://linkedin.com/in/vishwajeet"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        // Enhanced hover effects with accent-purple glow
                        whileHover={{ scale: 1.03, color: '#8A2BE2', boxShadow: '0 0 20px rgba(138, 43, 226, 0.4)' }}
                        className="p-4 bg-gradient-to-r from-accent-purple/30 to-electric-blue/30 border border-accent-purple rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-300 font-sans"
                    >
                        <span className="text-3xl">🔗</span>
                        <div>
                            <p className="font-semibold text-white">LinkedIn:</p>
                            <span className="text-accent-purple hover:underline">linkedin.com/in/vishwajeet</span>
                        </div>
                    </motion.a>
                </div>
            </div>
        ),
    };

    return (
        <AnimatePresence>
            {section && (
                <motion.div
                    key={section} // Key ensures AnimatePresence correctly handles component changes
                    // Entry animation: slides in from the right and fades in
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    // Exit animation: slides out to the right and fades out
                    exit={{ x: '100%', opacity: 0 }}
                    // Custom transition for a smooth, sci-fi feel
                    transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                    // Main panel styling: fixed position, responsive width, transparent background, backdrop blur, border, overflow
                    className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-black/80 text-white z-40 p-8
                               backdrop-blur-xl shadow-2xl border-l-2 border-electric-blue
                               overflow-y-auto custom-scrollbar relative font-sans" // Added relative for inner elements and font-sans
                >
                    {/* Background grid animation */}
                    <div className="absolute inset-0 z-0 opacity-10"
                         style={{
                             background: `
                                 linear-gradient(rgba(0,234,255,0.08) 1px, transparent 1px), /* Electric blue grid lines */
                                 linear-gradient(90deg, rgba(138,43,226,0.08) 1px, transparent 1px) /* Accent purple grid lines */
                             `,
                             backgroundSize: '20px 20px',
                             animation: 'panel-grid-pulse 8s infinite alternate ease-in-out'
                         }}
                    />

                    {/* Top-right corner accent glow */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-electric-blue/50 to-transparent rounded-bl-full blur-xl opacity-30 z-10" />

                    {/* Close button to return to the main nexus */}
                    <button
                        onClick={onClose}
                        // Styling for the close button: text color, hover effects, flex layout
                        className="text-lg text-electric-blue hover:text-accent-green mb-8 transition-colors duration-300
                                   flex items-center gap-2 font-semibold group relative z-20" // Added relative z-index
                    >
                        <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: -5 }} // Slides left on hover
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                            <span className="text-2xl">🌌</span> {/* Portal icon */}
                        </motion.span>
                        {/* Text with an animated bottom border on hover */}
                        <span className="border-b border-transparent group-hover:border-accent-green transition-colors duration-300">
                            Return to Nexus
                        </span>
                    </button>

                    {/* Content wrapper with z-index to ensure it appears above background effects */}
                    <div className="relative z-20">
                        {/* Renders content based on the selected section, or an error message */}
                        {sectionContent[section] || (
                            <p className="text-gray-400 text-center text-lg mt-10">
                                <GlitchText className="text-electric-blue">ERROR: Dimension Not Found</GlitchText>
                            </p>
                        )}
                    </div>

                    {/* Subtle animated overlay for 4D effect allusion (bottom left) */}
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-accent-purple/10 to-transparent rounded-tr-full blur-xl opacity-20 animate-pulse-slow z-10"></div>

                    {/* Custom CSS for animations (add this to your global CSS file, e.g., index.css or global.css) */}
                    <style>{`
                        @keyframes panel-grid-pulse {
                            0%, 100% { opacity: 0.1; transform: scale(1); }
                            50% { opacity: 0.15; transform: scale(1.02); }
                        }
                        /* Ensure custom-scrollbar and pulse-slow are defined globally in your main CSS */
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SectionPanel;
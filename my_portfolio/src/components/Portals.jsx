import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortalButton from './PortalButton'; // Assuming PortalButton is in the same directory
import GlitchText from './GlitchText'; // Assuming GlitchText is available

// Variants for the main container animation (fade in, scale up)
const containerVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delayChildren: 0.2, // Stagger children animations
      staggerChildren: 0.1,
      type: "spring",
      stiffness: 50,
      damping: 10,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 50,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Variants for individual items (buttons) within the container
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Portals = ({ onSelect }) => (
  <motion.div
    className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-10"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit" // Used with AnimatePresence in parent (App.jsx)
  >
    {/* Thematic Title for the Portal Hub */}
    <motion.div
      className="mb-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {/* GlitchText for the main title, using electric-blue for consistency */}
      <GlitchText className="text-4xl md:text-5xl lg:text-6xl text-electric-blue drop-shadow-[0_0_10px_#00eaff]">
        Dimensional Nexus
      </GlitchText>
      {/* Subtitle with refined text color */}
      <p className="text-sm md:text-base text-gray-300 mt-2 tracking-wide font-sans">
        Select a data stream to access.
      </p>
    </motion.div>

    {/* Holographic Panel for Buttons */}
    <motion.div
      className="relative flex flex-col items-center justify-center gap-6 p-8 md:p-10
                 bg-gradient-to-br from-accent-purple/30 to-electric-blue/30
                 border-2 border-electric-blue rounded-3xl backdrop-blur-md shadow-2xl
                 pointer-events-auto overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
      whileHover={{
        // Enhanced shadow glow using the new color palette
        boxShadow: '0 0 50px rgba(138, 43, 226, 0.8), 0 0 100px rgba(0, 234, 255, 0.4)',
        borderColor: '#00eaff', // Electric blue border on hover
        transition: { duration: 0.3 }
      }}
      style={{
        // Subtle background grid animation using new colors
        backgroundSize: '40px 40px',
        backgroundImage: `
          linear-gradient(to right, rgba(0,234,255,0.08) 1px, transparent 1px), /* Electric blue grid lines */
          linear-gradient(to bottom, rgba(138,43,226,0.08) 1px, transparent 1px)  /* Accent purple grid lines */
        `,
        animation: 'grid-pulse 5s infinite alternate ease-in-out'
      }}
    >
      {/* Inner glowing border effect */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none z-0"
           style={{
             // Inner shadow glow using the new color palette
             boxShadow: 'inset 0 0 20px rgba(138, 43, 226, 0.3), inset 0 0 40px rgba(0, 234, 255, 0.1)'
           }}
      />

      {/* Portal Buttons */}
      <div className="flex flex-col gap-6 w-full max-w-xs md:max-w-sm">
        {/* Each PortalButton now uses the updated styling from the previous turn */}
        <PortalButton label="About" onClick={() => onSelect('About')} delay={0.1} />
        <PortalButton label="Projects" onClick={() => onSelect('Projects')} delay={0.2} />
        <PortalButton label="Experience" onClick={() => onSelect('Experience')} delay={0.3} />
        <PortalButton label="Contact" onClick={() => onSelect('Contact')} delay={0.4} />
      </div>

      {/* Subtle bottom glow, using electric blue */}
      <div className="absolute bottom-0 w-3/4 h-10 bg-gradient-to-t from-electric-blue/30 to-transparent blur-xl" />
    </motion.div>

    {/* Custom CSS for animations (add this to your global CSS file, e.g., index.css or global.css) */}
    <style>{`
      @keyframes grid-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.01); }
      }
    `}</style>
  </motion.div>
);

export default Portals;
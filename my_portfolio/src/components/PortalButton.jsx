import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortalButton = ({ label, onClick, delay = 0 }) => {
  return (
    <motion.button
      onClick={onClick}
      // Initial state: slightly off-center, faded, and scaled down for a more dynamic entrance
      initial={{ opacity: 0, scale: 0.8, rotateX: 10, rotateY: 5 }}
      // Animation to active state: fully visible, normal scale, subtle rotation
      animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
      // Exit animation (if used with AnimatePresence)
      exit={{ opacity: 0, scale: 0.8, rotateX: -10, rotateY: -5 }}
      // Transition properties for entry/exit
      transition={{ delay, type: "spring", stiffness: 80, damping: 10, duration: 0.8 }}
      // Hover effects
      whileHover={{
        scale: 1.05, // Slightly larger on hover
        rotateX: -2, // Subtle tilt
        rotateY: 2,  // Subtle tilt
        boxShadow: '0 0 40px rgba(138, 43, 226, 0.7), 0 0 80px rgba(0, 255, 255, 0.4)', // Enhanced shadow glow
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      // Click/Tap feedback
      whileTap={{
        scale: 0.95, // Slightly shrink on tap
        boxShadow: '0 0 20px rgba(138, 43, 226, 0.9), 0 0 40px rgba(0, 255, 255, 0.6)', // Intense glow on tap
        transition: { duration: 0.1, ease: "easeIn" }
      }}
      // Main button styling: Futuristic gradient, glowing border, rounded corners
      className="relative px-10 py-4
                 bg-gradient-to-br from-purple-900/60 via-black/60 to-cyan-900/60
                 border-2 border-transparent rounded-full
                 text-white font-extrabold text-xl tracking-wider uppercase
                 overflow-hidden cursor-pointer transform-gpu
                 group" // Use group for nested hover effects
      style={{
          // Custom border gradient using pseudo-element trick (requires global CSS)
          // or a simple pulsing border (easier with Tailwind)
          // For simplicity, we'll use a pulsing border and a pseudo-element for a sharper edge.
          borderImage: 'linear-gradient(45deg, #8a2be2, #00ffff, #ff00c8) 1',
          borderImageSlice: 1,
          boxShadow: '0 0 15px rgba(138, 43, 226, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)',
          transformStyle: 'preserve-3d', // Enable 3D transforms for children
      }}
    >
      {/* Dynamic Inner Border Glow (pulsates and intensifies on hover) */}
      <motion.div
        className="absolute inset-0 rounded-full z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.4), rgba(0, 255, 255, 0.4), rgba(255, 0, 200, 0.4))',
          filter: 'blur(15px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Pulsating Energy Aura (behind the text) */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-cyan-300 opacity-10 blur-lg animate-pulse-slow z-0"
        style={{ animationDuration: '3s' }} // Custom animation duration
      />

      {/* Digital Scanline / Energy Sweep on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 rounded-full"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "linear", repeat: Infinity, repeatDelay: 0.1 }}
        style={{ pointerEvents: 'none' }} // Ensure it doesn't block clicks
      />

      {/* Thematic Icon */}
      <span className="relative z-20 inline-flex items-center justify-center gap-3">
        <motion.span
          className="text-3xl"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          🌌
        </motion.span>
        {/* Label text */}
        <span className="text-cyan-300 group-hover:text-white transition-colors duration-300 relative z-20">
          {label}
        </span>
      </span>

      {/* Click Ripple Effect (appears briefly on click) */}
      <AnimatePresence>
        {/* This will be triggered by a local state in a real scenario,
            but for a simple example, we'll simulate it with a fixed animation.
            In a real app, you'd set a state on click and render this conditionally. */}
        <motion.span
          className="absolute inset-0 rounded-full bg-white/20 blur-xl z-30"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          key="ripple" // Key to ensure AnimatePresence works
          style={{ pointerEvents: 'none' }}
        />
      </AnimatePresence>

      {/* Optional: Audio cue on click */}
      {/* <audio src="/sounds/portal-activate.mp3" preload="auto" ref={audioRef} /> */}
    </motion.button>
  );
};

export default PortalButton;

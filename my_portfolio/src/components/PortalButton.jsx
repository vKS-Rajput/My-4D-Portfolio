import React, { useState } from 'react'; // Import useState for ripple effect
import { motion, AnimatePresence } from 'framer-motion';

const PortalButton = ({ label, onClick, delay = 0 }) => {
  const [showRipple, setShowRipple] = useState(false); // State to control ripple visibility

  const handleClick = (e) => {
    setShowRipple(true); // Show ripple on click
    setTimeout(() => setShowRipple(false), 400); // Hide ripple after its animation
    onClick && onClick(e); // Call the original onClick prop
  };

  return (
    <motion.button
      onClick={handleClick} // Use our custom handleClick
      // Initial state: slightly off-center, faded, and scaled down for a more dynamic entrance
      initial={{ opacity: 0, scale: 0.8, rotateX: 10, rotateY: 5 }}
      // Animation to active state: fully visible, normal scale, subtle rotation
      animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
      // Exit animation (if used with AnimatePresence in parent)
      exit={{ opacity: 0, scale: 0.8, rotateX: -10, rotateY: -5 }}
      // Transition properties for entry/exit
      transition={{ delay, type: "spring", stiffness: 80, damping: 10, duration: 0.8 }}
      // Hover effects: subtle scale, rotation, and enhanced shadow glow
      whileHover={{
        scale: 1.05, // Slightly larger on hover
        rotateX: -2, // Subtle tilt
        rotateY: 2,  // Subtle tilt
        boxShadow: '0 0 40px rgba(138, 43, 226, 0.7), 0 0 80px rgba(0, 234, 255, 0.4)', // Accent purple and electric blue glow
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      // Click/Tap feedback: slight shrink and intense glow on tap
      whileTap={{
        scale: 0.95, // Slightly shrink on tap
        boxShadow: '0 0 20px rgba(138, 43, 226, 0.9), 0 0 40px rgba(0, 234, 255, 0.6)', // More intense glow
        transition: { duration: 0.1, ease: "easeIn" }
      }}
      // Main button styling: Futuristic gradient, glowing border (via shadow), rounded corners
      className="relative px-10 py-4
                 bg-gradient-to-br from-accent-purple/60 via-black/60 to-electric-blue/60
                 border-2 border-transparent rounded-full
                 text-white font-extrabold text-xl tracking-wider uppercase
                 overflow-hidden cursor-pointer transform-gpu
                 group" // Use group for nested hover effects
      style={{
        // Initial box shadow for the base glow, using the new color palette
        boxShadow: '0 0 15px rgba(138, 43, 226, 0.4), 0 0 30px rgba(0, 234, 255, 0.2)',
        transformStyle: 'preserve-3d', // Enable 3D transforms for children
      }}
    >
      {/* Dynamic Inner Border Glow (pulsates and intensifies on hover) */}
      {/* This creates a soft, blurred glow behind the button's main content */}
      <motion.div
        className="absolute inset-0 rounded-full z-0 pointer-events-none"
        style={{
          // Gradient background using the new color palette
          background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.4), rgba(0, 234, 255, 0.4), rgba(255, 0, 200, 0.4))',
          filter: 'blur(15px)', // Apply a strong blur for a glow effect
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }} // Subtle initial glow
        whileHover={{ opacity: 0.9 }} // Intensify on hover
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Pulsating Energy Aura (behind the text) */}
      {/* Creates a very subtle, slow-pulsing background effect */}
      <motion.div
        className="absolute inset-0 rounded-full
                   bg-gradient-to-r from-accent-purple/40 to-electric-blue/30
                   opacity-10 blur-lg animate-pulse-slow z-0"
        style={{ animationDuration: '3s' }} // Custom animation duration
      />

      {/* Digital Scanline / Energy Sweep on Hover */}
      {/* A visual sweep effect that appears on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 rounded-full"
        initial={{ x: '-100%' }} // Starts off-screen to the left
        whileHover={{ x: '100%' }} // Sweeps to the right on hover
        transition={{ duration: 0.6, ease: "linear", repeat: Infinity, repeatDelay: 0.1 }}
        style={{ pointerEvents: 'none' }} // Ensure it doesn't block clicks
      />

      {/* Thematic Icon and Label Text */}
      <span className="relative z-20 inline-flex items-center justify-center gap-3">
        {/* Icon with a subtle rotation on hover */}
        <motion.span
          className="text-3xl"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          🌌
        </motion.span>
        {/* Label text, changes color on hover for added interactivity */}
        <span className="text-electric-blue group-hover:text-white transition-colors duration-300 relative z-20">
          {label}
        </span>
      </span>

      {/* Click Ripple Effect (appears briefly on click) */}
      {/* Uses AnimatePresence to handle mounting/unmounting for the animation */}
      <AnimatePresence>
        {showRipple && (
          <motion.span
            className="absolute inset-0 rounded-full bg-white/20 blur-xl z-30"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }} // Ensure it fades out correctly
            transition={{ duration: 0.4, ease: "easeOut" }}
            key="ripple" // Key to ensure AnimatePresence works
            style={{ pointerEvents: 'none' }} // Ensure it doesn't block clicks
          />
        )}
      </AnimatePresence>

      {/* Optional: Audio cue on click (commented out, but shows where to add) */}
      {/* <audio src="/sounds/portal-activate.mp3" preload="auto" ref={audioRef} /> */}
    </motion.button>
  );
};

export default PortalButton;
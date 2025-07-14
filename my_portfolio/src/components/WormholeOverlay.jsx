import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WormholeOverlay = ({ isActive }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }} // Faster initial fade-in
        >
          {/* Core expanding ring - now electric blue with accent purple glow */}
          <motion.div
            className="rounded-full border-8 border-electric-blue" // Main border color
            style={{
              boxShadow: '0 0 60px 20px rgba(0, 234, 255, 0.6), 0 0 120px 40px rgba(138, 43, 226, 0.4)' // Electric blue and accent purple glow
            }}
            initial={{ scale: 0.05, opacity: 0.1 }} // Start smaller and more transparent
            animate={{ scale: 12, opacity: 0.85 }} // Expand significantly
            exit={{ scale: 20, opacity: 0 }} // Continue expanding on exit
            transition={{ duration: 0.7, ease: 'easeOut' }} // Smooth expansion
          />

          {/* Radiating glow pulse - now with electric blue, accent magenta, and accent purple */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-30"
            style={{
              background: 'linear-gradient(to right, var(--accent-purple), var(--electric-blue), var(--accent-magenta))'
            }}
            initial={{ scale: 0.3, opacity: 0.1 }} // Start smaller and more transparent
            animate={{ scale: 6, opacity: 0.3 }} // Expand and become slightly more visible
            exit={{ scale: 8, opacity: 0 }} // Continue expanding on exit
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }} // Slightly delayed and longer transition
          />

          {/* Central intense flash/flicker (new element) */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-white blur-lg opacity-0"
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.8 }}
            exit={{ scale: 0.1, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeIn', delay: 0.1 }} // Quick flash
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WormholeOverlay;
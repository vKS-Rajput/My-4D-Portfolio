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
          transition={{ duration: 0.5 }}
        >
          {/* Core expanding ring */}
          <motion.div
            className="rounded-full border-8 border-purple-500 shadow-[0_0_60px_20px_rgba(128,0,255,0.6)]"
            initial={{ scale: 0.1, opacity: 0.2 }}
            animate={{ scale: 12, opacity: 0.85 }}
            exit={{ scale: 20, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          {/* Optional: Radiating glow pulse (subtle layered effect) */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 blur-3xl opacity-30"
            initial={{ scale: 0.5, opacity: 0.1 }}
            animate={{ scale: 6, opacity: 0.2 }}
            exit={{ scale: 8, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WormholeOverlay;

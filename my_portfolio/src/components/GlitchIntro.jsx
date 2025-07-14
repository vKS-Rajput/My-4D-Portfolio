import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const GlitchIntro = ({ onEnter }) => {
  return (
    <motion.div
      // Initial state: fully opaque
      initial={{ opacity: 1 }}
      // Animation state: remains fully opaque until exit
      animate={{ opacity: 1 }}
      // Exit animation: fades out smoothly after a short delay
      exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.2 } }}
      // Styling for the full-screen overlay
      className="fixed inset-0 bg-black text-electric-blue font-heading flex flex-col items-center justify-center z-[999]"
    >
      {/* Container for the Typewriter effect, responsive font sizes */}
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl px-6 text-center leading-relaxed">
        <Typewriter
          options={{
            // Thematic strings for the typewriter effect
            strings: [
              "// Establishing secure connection...",
              "// Calibrating quantum interface...",
              "// Welcome, [Designation: Traveler]."
            ],
            autoStart: true, // Start typing automatically
            loop: false, // Do not loop the strings
            delay: 50, // Typing speed
            deleteSpeed: 20, // Deletion speed
            pauseFor: 1200, // Pause duration between strings
            // Ensure Typewriter text inherits the font and color from its parent
          }}
        />
      </div>

      {/* Enter Portal Button with enhanced styling and animations */}
      <motion.button
        onClick={onEnter}
        // Tailwind classes for styling: padding, font, text color, gradient background, rounded corners, border, shadow
        // Added hover effects for scale, border color, and shadow for better interactivity
        className="mt-12 px-8 py-4 text-xl font-bold text-white
                   bg-gradient-to-r from-accent-magenta to-electric-blue
                   rounded-full border border-electric-blue
                   shadow-lg hover:shadow-electric-blue/50
                   tracking-wider relative overflow-hidden
                   transition-all duration-300 ease-in-out
                   hover:scale-105 hover:border-accent-green"
        // Initial animation state: starts invisible and slightly below its final position
        initial={{ opacity: 0, y: 20 }}
        // Animation state: fades in and moves to its final position
        // Delay adjusted to appear after the Typewriter effect completes
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 6.5, duration: 0.8, ease: "easeOut" }} // Adjusted delay
      >
        {/* Subtle background glow effect for the button */}
        {/* This span creates a blurred, semi-transparent layer that adds a glow */}
        <span className="absolute inset-0 bg-electric-blue opacity-10 blur-lg rounded-full" />
        {/* The actual button text, placed above the glow layer */}
        <span className="relative z-10">👁 Enter Portal</span>
      </motion.button>
    </motion.div>
  );
};

export default GlitchIntro;

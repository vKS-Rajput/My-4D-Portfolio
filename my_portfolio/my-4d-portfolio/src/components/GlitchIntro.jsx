import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const GlitchIntro = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-black text-purple-300 font-mono flex flex-col items-center justify-center z-[999]"
    >
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl px-6 text-center leading-relaxed">
        <Typewriter
          options={{
            strings: ["▌Decrypting dimension…", "Welcome, traveler."],
            autoStart: true,
            loop: false,
            delay: 50,
            deleteSpeed: 20,
            pauseFor: 1200,
          }}
        />
      </div>

      <motion.button
        onClick={onEnter}
        className="mt-12 px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-purple-700 to-cyan-600 rounded-full border border-purple-400 shadow-lg hover:shadow-cyan-500/30 tracking-wider relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span className="absolute inset-0 bg-purple-400 opacity-10 blur-lg animate-pulse" />
        <span className="relative z-10">👁 Enter Portal</span>
      </motion.button>
    </motion.div>
  );
};

export default GlitchIntro;

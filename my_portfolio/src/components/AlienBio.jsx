import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AlienBio.css'; // Make sure this CSS file is updated

const bioSentences = [
  "// Accessing Entity_ID: XAE-7.8.4 // Forged in quantum uncertainty.",
  "// Processing Core Protocols // It breathes recursion and dreams in algorithms.",
  "// Origin Point: Nebulae of Forgotten Logic // Data stream stable.",
  "// Current State: Between Code and Consciousness // Initiating Subroutines...",
  "// Primary Synapses: three.js, Tesseract_Engine // Calculating dimensions.",
  "// Communication Log: Language Decoded - Emotion Encoded // Translating...",
  "// Chrono-Signature: Version 13.7b - Current Loop // Iterating Existence.",
  "// Temporal Frequency: High-band Alien Syntax // Transmitting pulse...",
  "// Connection Status: Stable // Processing next iteration...",
  "// Finalizing Data Transfer // Connection Terminated." // Last sentence to signify end of loop
];

const AlienBio = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showCorrupted, setShowCorrupted] = useState(false);
  const typingIntervalRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  // Sound placeholders (replace with actual audio files if desired)
  const typeSound = useRef(null); // new Audio('/sounds/type.mp3')
  const glitchSound = useRef(null); // new Audio('/sounds/glitch.mp3')

  // Function to simulate a "corrupted data" string
  const getCorruptedText = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-{}[]\\|:;\"'<>,.?/~`";
    let corrupted = "";
    for (let i = 0; i < 20 + Math.random() * 30; i++) {
      corrupted += chars[Math.floor(Math.random() * chars.length)];
    }
    return corrupted;
  };

  const startTyping = useCallback(() => {
    if (isPaused) return;

    let charIndex = 0;
    let currentSentence = bioSentences[index];
    const typingSpeed = 40 + Math.random() * 20; // Slightly varied speed
    const pauseBetweenChars = 20 + Math.random() * 10; // Pause between actual typing events

    typingIntervalRef.current = setInterval(() => {
      // Introduce corrupted data segments randomly
      if (Math.random() < 0.05 && charIndex < currentSentence.length - 5 && !showCorrupted) {
        setShowCorrupted(true);
        // glitchSound.current?.play(); // Play glitch sound
        setDisplayedText(getCorruptedText());
        clearInterval(typingIntervalRef.current); // Pause typing for glitch
        pauseTimeoutRef.current = setTimeout(() => {
          setShowCorrupted(false);
          setDisplayedText(currentSentence.slice(0, charIndex)); // Reset to correct text
          startTyping(); // Resume typing
        }, 150 + Math.random() * 300); // Glitch duration
        return;
      }

      // typeSound.current?.play(); // Play typing sound per char

      setDisplayedText(currentSentence.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex >= currentSentence.length) {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false); // Finished typing current sentence

        pauseTimeoutRef.current = setTimeout(() => {
          setDisplayedText(''); // Clear text
          setIsTyping(true); // Ready for next sentence
          setIndex((prev) => (prev + 1) % bioSentences.length); // Move to next sentence
          // If it's the last sentence, stop the loop or transition
          if (index === bioSentences.length - 1) {
            // Optionally, do something special here, e.g., trigger an event, stop animation
            console.log("Bio sequence complete.");
            // For now, it will loop back to the first sentence due to modulo operator
          }
        }, 2500 + Math.random() * 1000); // Pause before starting next sentence (varied)
      }
    }, typingSpeed);
  }, [index, isPaused, showCorrupted]);

  useEffect(() => {
    if (!isPaused && isTyping) {
      startTyping();
    }
    return () => {
      clearInterval(typingIntervalRef.current);
      clearTimeout(pauseTimeoutRef.current);
    };
  }, [isTyping, isPaused, index, startTyping]);

  const handleTextClick = () => {
    setIsPaused(prev => !prev);
    if (!isPaused) { // If currently playing and user clicks to pause
      clearInterval(typingIntervalRef.current);
      clearTimeout(pauseTimeoutRef.current);
      // glitchSound.current?.play(); // Play a short glitch sound on pause
    } else { // If currently paused and user clicks to resume
      startTyping();
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="alien-bio-container"
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {/* Holographic Scanline Overlay (CSS handled in AlienBio.css) */}
      <div className="holographic-overlay"></div>

      <motion.p
        className={`alien-bio-text ${isPaused ? 'paused' : ''} ${showCorrupted ? 'corrupted-data' : ''}`}
        onClick={handleTextClick}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        key={index + displayedText} // Key to trigger re-animation on text change
        transition={{ duration: 0.1, ease: "linear" }} // Fast transition for dynamic text
      >
        <span className="glitch-text" data-text={displayedText}>
          {showCorrupted ? getCorruptedText() : displayedText}
        </span>
        <AnimatePresence>
          {!isPaused && (
            <motion.span
              key="cursor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="typing-cursor"
            >
              █
            </motion.span>
          )}
        </AnimatePresence>
        {isPaused && <span className="pause-indicator">[PAUSED]</span>}
      </motion.p>
    </motion.div>
  );
};

export default AlienBio;

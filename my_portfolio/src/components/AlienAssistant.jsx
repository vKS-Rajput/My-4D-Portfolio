// src/components/AlienAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MicOff, Send } from 'lucide-react'; // Added Send icon for clarity
import Typewriter from 'typewriter-effect';

// Util: speak text via Web Speech API
const speak = (text, { pitch = 1.1, rate = 0.9 } = {}) => { // Slightly adjusted pitch and rate for more 'alien' feel
  if (!window.speechSynthesis) {
    console.warn("Web Speech API not supported in this browser.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  // Attempt to find a suitable voice, prioritize Google voices or a robotic/alien-sounding one if available
  utterance.voice =
    voices.find((v) => v.name.toLowerCase().includes('google') && v.lang.startsWith('en')) ||
    voices.find((v) => v.name.toLowerCase().includes('robot') || v.name.toLowerCase().includes('alien')) ||
    voices[0]; // Fallback to first available voice
  utterance.pitch = pitch;
  utterance.rate = rate;
  speechSynthesis.speak(utterance);
};

const AlienAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // { role:'user'|'ai', content:'' }
  const bottomRef = useRef(null); // Ref for scrolling to the bottom of the chat
  const textareaRef = useRef(null); // Ref for the textarea to auto-focus

  // Scroll chat to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus textarea when panel opens
  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  // Function to send message to the OpenAI API (as provided in the selected code)
  const sendMessage = async () => {
    const question = input.trim();
    if (!question) return;

    // Add user question to chat
    setMessages((m) => [...m, { role: 'user', content: question }]);
    setInput(''); // Clear input immediately
    setLoading(true); // Show loading indicator

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Using VITE_OPENAI_API_KEY as per provided code
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Using gpt-4o-mini as per provided code
          messages: [
            { role: 'system', content: 'You are an alien portfolio assistant.' }, // System prompt as per provided code
            { role: 'user', content: question }
          ],
          max_tokens: 200
        })
      });

      const data = await res.json();
      const aiReply =
        data.choices?.[0]?.message?.content ||
        '🛸 My galactic mind has no answer.';

      // Add AI reply to chat
      setMessages((m) => [...m, { role: 'ai', content: aiReply }]);

      // Speak the reply
      speak(aiReply);
    } catch (err) {
      console.error("Error sending message to OpenAI API:", err); // Updated error message
      setMessages((m) => [
        ...m,
        { role: 'ai', content: '⚠️ Something went wrong contacting HQ.' } // Error message as per provided code
      ]);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Submit on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans"> {/* Added font-sans for consistency */}
      {/* Toggle button for the assistant panel */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 234, 255, 0.6)' }} // Electric blue glow on hover
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-br from-accent-purple to-electric-blue p-4 rounded-full shadow-lg text-white
                   transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-black"
      >
        <Bot className="w-7 h-7" /> {/* Slightly larger icon */}
      </motion.button>

      {/* Assistant Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="assistant-panel" // Added key for AnimatePresence to work correctly
            initial={{ opacity: 0, y: 50, scale: 0.9 }} // More dynamic entrance
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-3 w-80 md:w-96 bg-black/85 border border-electric-blue rounded-xl shadow-2xl backdrop-blur-md p-4 text-sm text-gray-300 flex flex-col max-h-[75vh] overflow-hidden
                       relative group" // Added group for potential nested hover effects
          >
            {/* Subtle inner glow for the panel */}
            <div className="absolute inset-0 rounded-xl pointer-events-none z-0"
                 style={{
                   boxShadow: 'inset 0 0 30px rgba(0, 234, 255, 0.1), inset 0 0 60px rgba(138, 43, 226, 0.05)'
                 }}
            />

            {/* Header */}
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-accent-purple/50 relative z-10">
              <p className="text-electric-blue font-bold text-lg">👁 Alien Assistant // A.I. Unit</p> {/* More descriptive title */}
              <button
                onClick={() => {
                  speechSynthesis.cancel(); // Stop any ongoing speech
                  setIsOpen(false); // Close the panel
                }}
                className="text-accent-magenta hover:text-white transition-colors duration-200 focus:outline-none"
              >
                <X size={20} /> {/* Slightly larger close icon */}
              </button>
            </div>

            {/* Chat window */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar relative z-10"> {/* Added custom-scrollbar */}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-[85%] ${ // Increased padding, max-width
                    msg.role === 'user'
                      ? 'bg-accent-purple/30 ml-auto text-right' // User messages aligned right
                      : 'bg-electric-blue/20 mr-auto text-left' // AI messages aligned left
                  }`}
                >
                  {msg.role === 'ai' ? (
                    <Typewriter
                      options={{ strings: [msg.content], autoStart: true, delay: 15, cursor: '|' }} // Slower typing, custom cursor
                    />
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              ))}

              {loading && (
                <p className="italic text-accent-magenta animate-pulse text-center p-2">
                  👽 Contacting the galactic mind…
                </p>
              )}
              <div ref={bottomRef} /> {/* Scroll target */}
            </div>

            {/* Input area */}
            <div className="mt-4 flex gap-2 relative z-10">
              <textarea
                ref={textareaRef} // Assign ref to textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Transmit message..." // More thematic placeholder
                className="flex-1 resize-none bg-white/10 border border-accent-purple rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-electric-blue transition-colors duration-200 custom-scrollbar-thin" // Added custom-scrollbar-thin
                style={{ minHeight: '40px' }} // Ensure a minimum height for single line
              />
              <motion.button
                onClick={sendMessage}
                className="bg-electric-blue text-white p-2 rounded-md flex items-center justify-center
                           hover:bg-accent-green transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-electric-blue"
                disabled={loading || input.trim() === ''} // Disable if loading or input is empty
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={20} /> {/* Send icon */}
              </motion.button>
            </div>

            {/* Stop voice button */}
            <button
              onClick={() => speechSynthesis.cancel()}
              className="mt-2 text-xs text-gray-400 hover:text-accent-magenta flex items-center gap-1 self-end transition-colors duration-200 focus:outline-none relative z-10"
            >
              <MicOff size={16} /> Stop Voice Transmission
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlienAssistant;

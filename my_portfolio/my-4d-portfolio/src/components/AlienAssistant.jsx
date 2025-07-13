// src/components/AlienAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MicOff } from 'lucide-react';
import Typewriter from 'typewriter-effect';

// Util: speak text via Web Speech API
const speak = (text, { pitch = 1.2, rate = 1 } = {}) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  // Choose a non‑default voice if available
  utterance.voice =
    voices.find((v) => v.name.toLowerCase().includes('google')) || voices[0];
  utterance.pitch = pitch;
  utterance.rate = rate;
  speechSynthesis.speak(utterance);
};

const AlienAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // { role:'user'|'ai', content:'' }
  const bottomRef = useRef(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const question = input.trim();
    if (!question) return;

    // Add user question to chat
    setMessages((m) => [...m, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an alien portfolio assistant.' },
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
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: 'ai', content: '⚠️ Something went wrong contacting HQ.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Submit on Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-br from-purple-800 to-cyan-600 p-3 rounded-full shadow-lg text-white"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="assistant"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="mt-3 w-80 bg-black/90 border border-purple-600 rounded-xl shadow-lg backdrop-blur-md p-4 text-sm text-purple-200 flex flex-col max-h-[70vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-cyan-300 font-bold">👁 Alien Assistant</p>
              <button
                onClick={() => {
                  speechSynthesis.cancel();
                  setIsOpen(false);
                }}
                className="text-purple-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat window */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-purple-800/40 self-end'
                      : 'bg-cyan-800/30'
                  }`}
                >
                  {msg.role === 'ai' ? (
                    <Typewriter
                      options={{ strings: [msg.content], autoStart: true, delay: 10 }}
                    />
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              ))}

              {loading && (
                <p className="italic text-purple-400">
                  👽 Contacting the galactic mind…
                </p>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="mt-2 flex gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
                className="flex-1 resize-none bg-white/10 border border-purple-600 rounded-md px-3 py-1 text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="text-sm text-purple-400 hover:text-white"
                disabled={loading}
              >
                ➤
              </button>
            </div>

            {/* Stop voice button */}
            <button
              onClick={() => speechSynthesis.cancel()}
              className="mt-2 text-xs text-purple-400 hover:text-white flex items-center gap-1"
            >
              <MicOff size={14} /> Stop Voice
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlienAssistant;

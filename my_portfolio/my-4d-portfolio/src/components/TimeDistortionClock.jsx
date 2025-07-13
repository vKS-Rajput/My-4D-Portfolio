import React, { useEffect, useState } from 'react';

function TimeDistortionClock() {
  const [earthTime, setEarthTime] = useState('');
  const [galacticTime, setGalacticTime] = useState('');
  const [riftCountdown, setRiftCountdown] = useState(60); // 60s countdown

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Earth Time
      setEarthTime(now.toLocaleTimeString());

      // 4D Galactic Time: exaggerated alien-style time (example logic)
      const galactic = new Date(now.getTime() * 4.2);
      setGalacticTime(galactic.toUTCString().slice(17, 25));

      // Time Rift Countdown
      setRiftCountdown(prev => (prev <= 0 ? 60 : prev - 1));
    };

    updateTime(); // immediate first run
    const interval = setInterval(updateTime, 1000); // update every sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-5 right-5 z-30 text-right text-[12px] sm:text-sm md:text-base lg:text-lg p-4 text-cyan-300 bg-black/30 border border-cyan-500 rounded-xl backdrop-blur-md shadow-lg rotate-[5deg] animate-pulse">
      <div className="font-bold tracking-widest text-purple-400">🧬 Time-Distortion Clock</div>
      <div><span className="text-gray-400">🌍 Earth Time:</span> {earthTime}</div>
      <div><span className="text-gray-400">🌀 4D Time:</span> {galacticTime}</div>
      <div><span className="text-gray-400">⏳ Rift in:</span> {riftCountdown}s</div>
    </div>
  );
}

export default TimeDistortionClock;

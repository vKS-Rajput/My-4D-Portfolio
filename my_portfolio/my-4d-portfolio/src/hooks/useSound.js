// src/hooks/useSound.js
import { useEffect, useRef } from 'react';

const useSound = (src, { loop = false, volume = 1 } = {}) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src, loop, volume]);

  return {
    play: () => audioRef.current?.play(),
    stop: () => audioRef.current?.pause(),
    toggle: () => {
      if (!audioRef.current) return;
      if (audioRef.current.paused) audioRef.current.play();
      else audioRef.current.pause();
    }
  };
};

export default useSound;

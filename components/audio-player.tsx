"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Music2, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    const startPlayback = () => {
      if (!hasInteracted) {
        audio.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          cleanup();
        }).catch(err => {
          console.log("Playback failed even after interaction:", err);
        });
      }
    };

    const cleanup = () => {
      window.removeEventListener("click", startPlayback);
      window.removeEventListener("touchstart", startPlayback);
      window.removeEventListener("scroll", startPlayback);
      window.removeEventListener("mousedown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
    };

    if (!hasInteracted) {
      window.addEventListener("click", startPlayback);
      window.addEventListener("touchstart", startPlayback);
      window.addEventListener("scroll", startPlayback);
      window.addEventListener("mousedown", startPlayback);
      window.addEventListener("keydown", startPlayback);
      
      // Try autoplay immediately (might work if user previously allowed it)
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
        cleanup();
      }).catch(() => {
        console.log("Autoplay blocked, waiting for interaction...");
      });
    }

    return cleanup;
  }, [hasInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <audio
        ref={audioRef}
        src="/The Piano Duet.mp3"
        loop
        preload="auto"
      />
      
      <motion.button
        onClick={togglePlay}
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-colors duration-500 overflow-hidden group",
          isPlaying 
            ? "bg-white/10 backdrop-blur-xl border border-pink-500/30 text-pink-400" 
            : "bg-black/40 backdrop-blur-md border border-white/10 text-white/70"
        )}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {/* Pulsing background effect when playing */}
        {isPlaying && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-pink-500/20 rounded-full"
          />
        )}

        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 20 }}
              className="relative z-10"
            >
              <Music className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="relative z-10"
            >
              <Music2 className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Visualizer bars */}
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center gap-0.5 opacity-30 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [10, 24, 12, 18, 10],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6 + (i * 0.1),
                  ease: "easeInOut",
                  delay: i * 0.05
                }}
                className="w-1 bg-pink-400 rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>

      {/* We removed the explicit "Toca para activar" tooltip to satisfy user request. 
          The music will now start automatically on any click, touch, or scroll on the page. */}
    </div>
  );
}

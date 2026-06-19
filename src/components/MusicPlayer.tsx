import { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import defaultSong from '../../assets/07 - Kalyanam Vaibhogam (Climax Version) - SenSongsMp3.Co.mp3';

interface MusicPlayerProps {
  autoPlayTrigger: boolean;
  audioUrl?: string;
}

export default function MusicPlayer({ autoPlayTrigger, audioUrl }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Fallback to local audio asset
  const DEFAULT_AUDIO = defaultSong;
  const currentAudioSource = audioUrl || DEFAULT_AUDIO;

  useEffect(() => {
    // Whenever the source changes, reload if playing
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Failed to autoplay newly uploaded track", err));
      }
    }
  }, [currentAudioSource]);

  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted && audioRef.current) {
      handlePlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTrigger]);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25; // Gentle volume level
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      })
      .catch((err) => {
        console.log("Autoplay blocked or audio failed, waiting for direct user click.", err);
      });
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(console.error);
    }
  };

  return (
    <div id="music-player-widget" className="fixed bottom-24 right-4 z-40">
      <audio 
        ref={audioRef} 
        src={currentAudioSource} 
        loop 
        preload="auto"
      />

      <AnimatePresence>
        {autoPlayTrigger && (
          <motion.button
            id="music-toggle-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlayback}
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg border cursor-pointer ${
              isPlaying 
                ? 'bg-[#4A0404] text-[#D4AF37] border-[#D4AF37]/40 border-2' 
                : 'bg-stone-100 text-stone-600 border-stone-300'
            }`}
            title={isPlaying ? "Mute Background Music" : "Play Background Music"}
          >
            {isPlaying ? (
              <div className="relative flex items-center justify-center">
                <Volume2 className="w-5 h-5 animate-pulse" />
                <Music className="w-3 h-3 absolute -top-1 -right-1 text-amber-300 animate-bounce" />
              </div>
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
            
            {/* Spinning background halo */}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/50 animate-spin-slow pointer-events-none"></span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

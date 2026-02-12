import { useState, useEffect, useRef } from 'react';

export function useLoopingAudio(audioSrc: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.3; // Set moderate volume
    audioRef.current = audio;

    // Attempt to auto-play (may be blocked by browser)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((error) => {
          console.log('Auto-play prevented:', error);
          setIsPlaying(false);
          setAutoplayBlocked(true);
        });
    }

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      setIsPlaying(false);
      setAutoplayBlocked(false);
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      }).catch((error) => {
        console.error('Play error:', error);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const startPlayback = () => {
    if (!audioRef.current) return;

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
    }).catch((error) => {
      console.error('Start playback error:', error);
    });
  };

  return {
    isPlaying,
    isMuted,
    autoplayBlocked,
    togglePlay,
    toggleMute,
    startPlayback,
  };
}

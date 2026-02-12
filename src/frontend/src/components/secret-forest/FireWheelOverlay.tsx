import { useState, useEffect, useRef } from 'react';
import { FIRE_WHEEL_CONFIG } from '@/config/fireWheel';

interface FireWheelOverlayProps {
  onComplete: () => void;
}

export default function FireWheelOverlay({ onComplete }: FireWheelOverlayProps) {
  const [useFallback, setUseFallback] = useState(!FIRE_WHEEL_CONFIG.clipUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Auto-complete after duration
    const timer = setTimeout(() => {
      onComplete();
    }, FIRE_WHEEL_CONFIG.fireWheelDuration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Determine if URL is YouTube
  const isYouTube = FIRE_WHEEL_CONFIG.clipUrl.includes('youtube.com') || 
                    FIRE_WHEEL_CONFIG.clipUrl.includes('youtu.be');

  const handleVideoError = () => {
    setUseFallback(true);
  };

  const handleIframeError = () => {
    setUseFallback(true);
  };

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
      {!useFallback && FIRE_WHEEL_CONFIG.clipUrl && (
        <>
          {isYouTube ? (
            <iframe
              ref={iframeRef}
              src={`${FIRE_WHEEL_CONFIG.clipUrl}?autoplay=1&mute=1&controls=0&loop=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              onError={handleIframeError}
              title="Fire Wheel"
            />
          ) : (
            <video
              ref={videoRef}
              src={FIRE_WHEEL_CONFIG.clipUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={handleVideoError}
            />
          )}
        </>
      )}

      {/* Fallback Fire Wheel animation */}
      {useFallback && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Spinning fire wheel effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="fire-wheel-spin">
              {/* Multiple rotating rings for fire wheel effect */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border-4 animate-fire-wheel-rotate"
                  style={{
                    width: `${100 + i * 50}px`,
                    height: `${100 + i * 50}px`,
                    borderColor: `oklch(${0.7 - i * 0.05} 0.3 ${30 + i * 10})`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${1 + i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Fire particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-t from-orange-600 via-red-500 to-yellow-400 animate-fire-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                }}
              />
            ))}
          </div>

          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-radial from-yellow-300 via-orange-500 to-transparent animate-pulse opacity-80" />
          </div>

          {/* Text overlay */}
          <div className="relative z-10 text-center">
            <p className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 animate-pulse">
              🔥
            </p>
            <p className="mt-4 text-2xl md:text-4xl font-bold text-orange-400 animate-pulse">
              Fire Wheel
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

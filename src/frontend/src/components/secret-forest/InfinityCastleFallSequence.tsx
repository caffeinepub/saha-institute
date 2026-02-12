import { useEffect, useState } from 'react';

interface InfinityCastleFallSequenceProps {
  onComplete: () => void;
}

export default function InfinityCastleFallSequence({ onComplete }: InfinityCastleFallSequenceProps) {
  const [phase, setPhase] = useState<'falling' | 'muzan' | 'glitch'>('falling');

  useEffect(() => {
    // After 45 seconds, show Muzan
    const muzanTimer = setTimeout(() => {
      setPhase('muzan');
    }, 45000);

    // After 46 seconds (1 second for Muzan appearance), trigger glitch
    const glitchTimer = setTimeout(() => {
      setPhase('glitch');
    }, 46000);

    // After 47 seconds (1 second for glitch), complete sequence
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 47000);

    return () => {
      clearTimeout(muzanTimer);
      clearTimeout(glitchTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-auto">
      {/* Falling phase */}
      {phase === 'falling' && (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-950 to-black animate-infinity-fall">
          {/* Infinity Castle placeholder - geometric patterns */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute border border-purple-500/40 animate-castle-drift"
                style={{
                  width: `${100 + Math.random() * 200}px`,
                  height: `${100 + Math.random() * 200}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>

          {/* Falling text indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 animate-pulse">
              <p className="text-6xl md:text-8xl font-bold text-purple-400 opacity-80">
                ∞
              </p>
              <p className="text-2xl md:text-4xl font-bold text-purple-300">
                Falling into the Infinity Castle...
              </p>
            </div>
          </div>

          {/* Vertical motion lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-fall-line"
                style={{
                  left: `${Math.random() * 100}%`,
                  height: `${50 + Math.random() * 100}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Muzan appearance phase */}
      {phase === 'muzan' && (
        <div className="absolute inset-0 bg-black flex items-center justify-center animate-muzan-appear">
          <div className="text-center space-y-6">
            <div className="text-8xl md:text-9xl animate-pulse">
              👹
            </div>
            <p className="text-4xl md:text-6xl font-bold text-red-600 animate-pulse">
              MUZAN KIBUTSUJI
            </p>
            <p className="text-xl md:text-2xl text-red-400">
              The Demon King appears...
            </p>
          </div>
        </div>
      )}

      {/* Glitch phase */}
      {phase === 'glitch' && (
        <div className="absolute inset-0 bg-black animate-screen-glitch">
          <div className="absolute inset-0 bg-red-600 opacity-50 animate-glitch-flash" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-6xl md:text-8xl font-bold text-white animate-glitch-text">
              ERROR
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

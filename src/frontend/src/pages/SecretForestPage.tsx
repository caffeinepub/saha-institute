import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import ForestScene from '@/components/secret-forest/ForestScene';
import MangaVolumesGrid from '@/components/secret-forest/MangaVolumesGrid';
import CharactersReveal from '@/components/secret-forest/CharactersReveal';
import InfinityCastleFallSequence from '@/components/secret-forest/InfinityCastleFallSequence';
import FireWheelKickoutSequence from '@/components/secret-forest/FireWheelKickoutSequence';
import { useLoopingAudio } from '@/hooks/useLoopingAudio';
import { useIdleDetector } from '@/hooks/useIdleDetector';

type SequenceState = 'normal' | 'falling' | 'fireWheel';

export default function SecretForestPage() {
  const [backgroundClickCount, setBackgroundClickCount] = useState(0);
  const [showCharacters, setShowCharacters] = useState(false);
  const [sequenceState, setSequenceState] = useState<SequenceState>('normal');
  const [hasActivityAfterSequence, setHasActivityAfterSequence] = useState(false);
  const foregroundRef = useRef<HTMLDivElement>(null);

  const { isPlaying, isMuted, autoplayBlocked, toggleMute, togglePlay, startPlayback } = useLoopingAudio('/assets/audio/bird-chirping-loop.mp3');

  // Track user activity after sequence completes
  useEffect(() => {
    if (sequenceState !== 'normal') {
      setHasActivityAfterSequence(false);
      return;
    }

    const handleActivity = () => {
      setHasActivityAfterSequence(true);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { once: true, passive: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [sequenceState]);

  // Infinity Castle idle detection (2 minutes) - higher priority (triggers first)
  useIdleDetector({
    enabled: sequenceState === 'normal' && hasActivityAfterSequence,
    idleDuration: 2 * 60 * 1000, // 2 minutes
    onIdle: () => {
      setSequenceState('falling');
    },
    requireActivity: !hasActivityAfterSequence,
  });

  // Fire Wheel idle detection (3 minutes) - lower priority (triggers if Infinity Castle doesn't)
  useIdleDetector({
    enabled: sequenceState === 'normal' && hasActivityAfterSequence,
    idleDuration: 3 * 60 * 1000, // 3 minutes
    onIdle: () => {
      // Only trigger if not already in a sequence
      if (sequenceState === 'normal') {
        setSequenceState('fireWheel');
      }
    },
    requireActivity: !hasActivityAfterSequence,
  });

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only count clicks when in normal state (not during sequence)
    if (sequenceState !== 'normal') return;

    // Check if click is outside foreground content
    if (foregroundRef.current && !foregroundRef.current.contains(e.target as Node)) {
      setBackgroundClickCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 10) {
          setShowCharacters(true);
        }
        return newCount;
      });
    }
  };

  const handleInfinityCastleComplete = () => {
    // Return to normal state after Infinity Castle sequence completes
    setSequenceState('normal');
    setHasActivityAfterSequence(false);
  };

  const handleFireWheelComplete = () => {
    // Fire Wheel navigates away, but set state for cleanup
    setSequenceState('normal');
  };

  // Prevent navigation during sequences
  useEffect(() => {
    if (sequenceState === 'falling' || sequenceState === 'fireWheel') {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
      };

      const handlePopState = (e: PopStateEvent) => {
        e.preventDefault();
        window.history.pushState(null, '', window.location.pathname);
      };

      // Push current state to prevent back navigation
      window.history.pushState(null, '', window.location.pathname);
      window.addEventListener('popstate', handlePopState);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [sequenceState]);

  return (
    <div className="secret-forest relative min-h-screen overflow-hidden" onClick={handleBackgroundClick}>
      <ForestScene />

      {/* Audio controls */}
      <div className="fixed right-4 top-4 z-50 flex gap-2">
        {autoplayBlocked && !isPlaying && (
          <Button
            variant="default"
            size="default"
            onClick={startPlayback}
            className="bg-primary/90 backdrop-blur-sm animate-pulse"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Audio
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="bg-background/80 backdrop-blur-sm"
          disabled={autoplayBlocked && !isPlaying}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          className="bg-background/80 backdrop-blur-sm"
          disabled={!isPlaying}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Foreground content */}
      <div ref={foregroundRef} className="relative z-10 container px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl space-y-12">
          {/* Title */}
          <div className="text-center">
            <h1 className="neon-text mb-4 text-5xl font-bold tracking-tight md:text-6xl">
              Secret Forest of Demons
            </h1>
            <p className="neon-text-subtle text-lg">
              You've discovered the hidden realm...
            </p>
          </div>

          {/* Manga Reading Section */}
          <Card className="border-2 border-primary/30 bg-background/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="neon-text text-3xl">
                Demon Slayer Manga Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MangaVolumesGrid />
            </CardContent>
          </Card>

          {/* Games Section */}
          <Card className="border-2 border-secondary/30 bg-background/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="neon-text text-3xl">
                Demon Slayer Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {['Breathing Techniques Training', 'Demon Hunt Challenge', 'Hashira Tournament', 'Sword Mastery', 'Demon Slayer Quiz', 'Final Selection Trial'].map((game, idx) => (
                  <Card key={idx} className="border border-primary/20 bg-card/50">
                    <CardContent className="p-6 text-center">
                      <p className="neon-text-subtle font-semibold">{game}</p>
                      <p className="mt-2 text-xs text-muted-foreground">Coming Soon</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Characters Reveal */}
          {showCharacters && <CharactersReveal />}
        </div>
      </div>

      {/* Infinity Castle Fall Sequence Overlay */}
      {sequenceState === 'falling' && (
        <InfinityCastleFallSequence onComplete={handleInfinityCastleComplete} />
      )}

      {/* Fire Wheel Kickout Sequence Overlay */}
      {sequenceState === 'fireWheel' && (
        <FireWheelKickoutSequence onComplete={handleFireWheelComplete} />
      )}
    </div>
  );
}

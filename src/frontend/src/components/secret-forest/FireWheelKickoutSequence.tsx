import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import FireWheelOverlay from './FireWheelOverlay';
import { FIRE_WHEEL_CONFIG } from '@/config/fireWheel';

interface FireWheelKickoutSequenceProps {
  onComplete: () => void;
}

export default function FireWheelKickoutSequence({ onComplete }: FireWheelKickoutSequenceProps) {
  const [phase, setPhase] = useState<'fireWheel' | 'blackout' | 'complete'>('fireWheel');
  const navigate = useNavigate();

  useEffect(() => {
    // After Fire Wheel duration, transition to blackout
    const blackoutTimer = setTimeout(() => {
      setPhase('blackout');
    }, FIRE_WHEEL_CONFIG.fireWheelDuration);

    // After blackout, navigate to fake 404
    const navigateTimer = setTimeout(() => {
      setPhase('complete');
      navigate({ to: '/kicked-out-404' });
      onComplete();
    }, FIRE_WHEEL_CONFIG.fireWheelDuration + FIRE_WHEEL_CONFIG.blackoutDuration);

    return () => {
      clearTimeout(blackoutTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-auto">
      {/* Fire Wheel phase */}
      {phase === 'fireWheel' && (
        <FireWheelOverlay onComplete={() => setPhase('blackout')} />
      )}

      {/* Blackout phase */}
      {phase === 'blackout' && (
        <div className="absolute inset-0 bg-black animate-blackout-fade" />
      )}
    </div>
  );
}

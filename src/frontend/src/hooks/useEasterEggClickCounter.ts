import { useState, useCallback, useEffect } from 'react';

interface UseEasterEggClickCounterOptions {
  enabled: boolean;
  threshold: number;
  onThresholdReached: () => void;
}

export function useEasterEggClickCounter({
  enabled,
  threshold,
  onThresholdReached,
}: UseEasterEggClickCounterOptions) {
  const [clickCount, setClickCount] = useState(0);

  // Reset counter when disabled
  useEffect(() => {
    if (!enabled) {
      setClickCount(0);
    }
  }, [enabled]);

  const handleClick = useCallback(() => {
    if (!enabled) return;

    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === threshold) {
        onThresholdReached();
        return 0; // Reset after triggering
      }
      return newCount;
    });
  }, [enabled, threshold, onThresholdReached]);

  return { clickCount, handleClick };
}

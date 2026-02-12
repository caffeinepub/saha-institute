import { useEffect, useRef, useCallback } from 'react';

interface UseIdleDetectorOptions {
  enabled: boolean;
  idleDuration: number; // in milliseconds
  onIdle: () => void;
  requireActivity?: boolean; // If true, requires at least one activity event before firing
}

export function useIdleDetector({ enabled, idleDuration, onIdle, requireActivity = false }: UseIdleDetectorOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onIdleRef = useRef(onIdle);
  const hasActivityRef = useRef(!requireActivity);

  // Keep callback ref up to date
  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  // Reset activity flag when requireActivity changes
  useEffect(() => {
    hasActivityRef.current = !requireActivity;
  }, [requireActivity]);

  const resetTimer = useCallback(() => {
    if (!enabled) return;

    // Mark that we've seen activity
    hasActivityRef.current = true;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      // Only fire if we've seen activity (or don't require it)
      if (hasActivityRef.current) {
        onIdleRef.current();
      }
    }, idleDuration);
  }, [enabled, idleDuration]);

  useEffect(() => {
    if (!enabled) {
      // Clear timer when disabled
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // Activity event types to monitor
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    // Start initial timer only if we don't require activity first
    if (!requireActivity) {
      resetTimer();
    }

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [enabled, resetTimer, requireActivity]);
}

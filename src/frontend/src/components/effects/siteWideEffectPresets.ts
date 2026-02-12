export interface EffectPreset {
  id: string;
  name: string;
  description: string;
  duration: number; // in milliseconds
  color: string;
  icon: string;
}

export const effectPresets: EffectPreset[] = [
  {
    id: 'confetti-burst',
    name: 'Confetti Burst',
    description: 'Colorful confetti particles burst across the screen',
    duration: 5000,
    color: '#FF6B6B',
    icon: '🎉',
  },
  {
    id: 'falling-particles',
    name: 'Falling Particles',
    description: 'Gentle particles drift down from the top of the screen',
    duration: 8000,
    color: '#4ECDC4',
    icon: '✨',
  },
  {
    id: 'glow-sweep',
    name: 'Glow Sweep',
    description: 'A radiant glow sweeps across the entire screen',
    duration: 4000,
    color: '#FFD93D',
    icon: '💫',
  },
  {
    id: 'screen-pulse',
    name: 'Screen Pulse',
    description: 'Subtle pulsing effect that gently highlights the screen',
    duration: 3000,
    color: '#A8E6CF',
    icon: '💚',
  },
  {
    id: 'spotlight-rays',
    name: 'Spotlight Rays',
    description: 'Soft rays of light emanate from the center',
    duration: 6000,
    color: '#FFB6C1',
    icon: '🌟',
  },
  {
    id: 'shimmer-wave',
    name: 'Shimmer Wave',
    description: 'A shimmering wave effect flows across the screen',
    duration: 5000,
    color: '#B19CD9',
    icon: '🌊',
  },
  {
    id: 'sparkle-trail',
    name: 'Sparkle Trail',
    description: 'Sparkling particles follow cursor movement',
    duration: 7000,
    color: '#FFA07A',
    icon: '✨',
  },
  {
    id: 'aurora-glow',
    name: 'Aurora Glow',
    description: 'Aurora-like colors dance across the screen',
    duration: 10000,
    color: '#87CEEB',
    icon: '🌌',
  },
];

/**
 * Fire Wheel configuration for the kickout sequence.
 * Configure the official clip URL here.
 */

export const FIRE_WHEEL_CONFIG = {
  // Official Fire Wheel clip URL (YouTube or direct video)
  // Example YouTube: 'https://www.youtube.com/embed/VIDEO_ID'
  // Example direct: '/path/to/fire-wheel.mp4'
  clipUrl: '', // Leave empty to use fallback animation
  
  // Timing configuration (in milliseconds)
  fireWheelDuration: 3000, // 3 seconds for Fire Wheel overlay
  blackoutDuration: 2000,  // 2 seconds for blackout
  
  // Idle duration before Fire Wheel triggers (in milliseconds)
  idleDuration: 3 * 60 * 1000, // 3 minutes (longer than Infinity Castle's 2 minutes)
} as const;

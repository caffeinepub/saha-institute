import { useEffect, useState } from 'react';
import { useSiteWideEffectState } from './useSiteWideEffectState';
import ConfettiBurstEffect from './presets/ConfettiBurstEffect';
import FallingParticlesEffect from './presets/FallingParticlesEffect';
import GlowSweepEffect from './presets/GlowSweepEffect';
import ScreenPulseEffect from './presets/ScreenPulseEffect';
import SpotlightRaysEffect from './presets/SpotlightRaysEffect';
import ShimmerWaveEffect from './presets/ShimmerWaveEffect';
import SparkleTrailEffect from './presets/SparkleTrailEffect';
import AuroraGlowEffect from './presets/AuroraGlowEffect';
import { effectPresets } from './siteWideEffectPresets';

export default function SiteWideEffectsLayer() {
  const { data: activeEffect } = useSiteWideEffectState();
  const [showEffect, setShowEffect] = useState(false);
  const [currentEffectType, setCurrentEffectType] = useState<string | null>(null);

  useEffect(() => {
    if (activeEffect && activeEffect.active) {
      setCurrentEffectType(activeEffect.effectType);
      setShowEffect(true);

      const preset = effectPresets.find(p => p.id === activeEffect.effectType);
      const duration = preset?.duration || 5000;

      const timer = setTimeout(() => {
        setShowEffect(false);
        setCurrentEffectType(null);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setShowEffect(false);
      setCurrentEffectType(null);
    }
  }, [activeEffect]);

  if (!showEffect || !currentEffectType) {
    return null;
  }

  const renderEffect = () => {
    switch (currentEffectType) {
      case 'confetti-burst':
        return <ConfettiBurstEffect />;
      case 'falling-particles':
        return <FallingParticlesEffect />;
      case 'glow-sweep':
        return <GlowSweepEffect />;
      case 'screen-pulse':
        return <ScreenPulseEffect />;
      case 'spotlight-rays':
        return <SpotlightRaysEffect />;
      case 'shimmer-wave':
        return <ShimmerWaveEffect />;
      case 'sparkle-trail':
        return <SparkleTrailEffect />;
      case 'aurora-glow':
        return <AuroraGlowEffect />;
      default:
        return null;
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {renderEffect()}
    </div>
  );
}

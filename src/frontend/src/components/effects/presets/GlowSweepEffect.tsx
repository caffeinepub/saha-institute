export default function GlowSweepEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-glow-sweep" />
    </div>
  );
}

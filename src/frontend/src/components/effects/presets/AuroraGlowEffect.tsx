export default function AuroraGlowEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-aurora-flow" />
      <div className="absolute inset-0 bg-gradient-to-tl from-secondary/15 via-primary/15 to-accent/15 animate-aurora-flow-reverse" />
    </div>
  );
}

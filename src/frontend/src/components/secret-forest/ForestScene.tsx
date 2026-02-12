export default function ForestScene() {
  return (
    <>
      {/* Background layer with forest animation */}
      <div className="fixed inset-0 z-0 forest-background">
        {/* Animated forest background */}
        <div className="absolute inset-0 animate-forest-drift bg-gradient-to-b from-green-900/40 via-green-800/30 to-green-950/50" />
        
        {/* Tree silhouettes layer */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>

      {/* Falling leaves layer */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="leaf absolute animate-leaf-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            🍃
          </div>
        ))}
      </div>
    </>
  );
}

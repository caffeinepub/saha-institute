export default function SpotlightRaysEffect() {
  const rays = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    rotation: (i * 360) / 12,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {rays.map((ray) => (
        <div
          key={ray.id}
          className="absolute h-[200%] w-1 bg-gradient-to-t from-transparent via-primary/20 to-transparent animate-spotlight-ray"
          style={{
            transform: `rotate(${ray.rotation}deg)`,
            transformOrigin: 'center',
            animationDelay: `${ray.id * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';

export default function MangaVolumesGrid() {
  const volumes = Array.from({ length: 23 }, (_, i) => i + 1);

  // Generate Viz official URL for each volume
  const getVizUrl = (volume: number) => {
    return `https://www.viz.com/shonenjump/chapters/demon-slayer-kimetsu-no-yaiba?volume=${volume}`;
  };

  return (
    <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {volumes.map((volume) => (
        <a
          key={volume}
          href={getVizUrl(volume)}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-105"
        >
          <Card className="border border-primary/20 bg-card/50 transition-all hover:border-primary/50 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="mb-2 text-4xl">📖</div>
              <p className="neon-text-subtle font-bold">Volume {volume}</p>
              <p className="mt-1 text-xs text-muted-foreground">Read on Viz</p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone } from 'lucide-react';
import { useActor } from '@/hooks/useActor';
import { useNavigate } from '@tanstack/react-router';
import { useEasterEggClickCounter } from '@/hooks/useEasterEggClickCounter';

export default function CentresPage() {
  const { actor, isFetching: actorFetching } = useActor();
  const navigate = useNavigate();

  const { data: centres, isLoading } = useQuery({
    queryKey: ['centres'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCentres();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const showEmptyState = !isLoading && !actorFetching && !!centres && centres.length === 0;

  const { handleClick } = useEasterEggClickCounter({
    enabled: showEmptyState,
    threshold: 28,
    onThresholdReached: () => {
      navigate({ to: '/forest-of-demons' });
    },
  });

  const isLoadingState = isLoading || actorFetching;

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Our Centres</h1>
          <p className="text-lg text-muted-foreground">
            Find a Saha Institute coaching centre near you across West Bengal
          </p>
        </div>

        {isLoadingState ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 w-48 rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-muted" />
                    <div className="h-4 w-32 rounded bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : centres && centres.length > 0 ? (
          <div className="space-y-4">
            {centres.map((centre) => (
              <Card key={centre.id} className="border-2 transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {centre.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {centre.address && (
                    <p className="text-sm text-muted-foreground">{centre.address}</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {centre.phoneNumbers.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone}`}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {phone}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-2 cursor-pointer" onClick={handleClick}>
            <CardContent className="py-12 text-center">
              <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">
                Centre information will be available soon. Please contact us for details.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Calendar } from 'lucide-react';
import { useActor } from '@/hooks/useActor';

export default function AnnouncementsPage() {
  const { actor, isFetching: actorFetching } = useActor();

  const { data: announcements, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAnnouncements();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isLoadingState = isLoading || actorFetching;

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Announcements</h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest news and important information from Saha Institute
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
                    <div className="h-4 w-3/4 rounded bg-muted" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : announcements && announcements.length > 0 ? (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={Number(announcement.id)} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-primary" />
                      Announcement
                    </CardTitle>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(announcement.createdAt)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{announcement.text}</p>
                  {announcement.videoUrl && (
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <iframe
                        src={announcement.videoUrl}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  {announcement.audioUrl && (
                    <audio controls className="w-full">
                      <source src={announcement.audioUrl} />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <Megaphone className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">No announcements at the moment. Check back soon!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

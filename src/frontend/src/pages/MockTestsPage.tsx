import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Video, BookOpen, Calendar } from 'lucide-react';
import { useActor } from '@/hooks/useActor';

export default function MockTestsPage() {
  const { actor, isFetching: actorFetching } = useActor();

  const { data: mockTests, isLoading } = useQuery({
    queryKey: ['mockTests'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMockTests();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getContentIcon = (content: any) => {
    if ('video' in content) return <Video className="h-5 w-5" />;
    if ('pdf' in content) return <FileText className="h-5 w-5" />;
    return <BookOpen className="h-5 w-5" />;
  };

  const getContentType = (content: any) => {
    if ('video' in content) return 'Video';
    if ('pdf' in content) return 'PDF';
    return 'Text';
  };

  const filterByType = (type: string) => {
    if (!mockTests) return [];
    return mockTests.filter((test) => {
      if (type === 'video') return 'video' in test.content;
      if (type === 'pdf') return 'pdf' in test.content;
      if (type === 'text') return 'text' in test.content;
      return true;
    });
  };

  const renderContent = (test: any) => {
    if ('video' in test.content) {
      return (
        <div className="aspect-video overflow-hidden rounded-lg">
          <iframe
            src={test.content.video}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    if ('pdf' in test.content) {
      return (
        <a
          href={test.content.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <FileText className="h-4 w-4" />
          Download PDF
        </a>
      );
    }
    return <p className="text-muted-foreground">{test.content.text}</p>;
  };

  const isLoadingState = isLoading || actorFetching;

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Mock Tests</h1>
          <p className="text-lg text-muted-foreground">
            Practice with our comprehensive mock tests and study materials
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="pdf">PDFs</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>

          {['all', 'video', 'pdf', 'text'].map((type) => (
            <TabsContent key={type} value={type} className="mt-6">
              {isLoadingState ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-6 w-48 rounded bg-muted" />
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 w-full rounded bg-muted" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filterByType(type).length > 0 ? (
                <div className="space-y-6">
                  {filterByType(type).map((test) => (
                    <Card key={Number(test.id)} className="border-2">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <CardTitle className="flex items-center gap-2">
                            {getContentIcon(test.content)}
                            {test.title}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{getContentType(test.content)}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(test.createdAt)}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>{renderContent(test)}</CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-2">
                  <CardContent className="py-12 text-center">
                    <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No {type === 'all' ? '' : type} mock tests available yet. Check back soon!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

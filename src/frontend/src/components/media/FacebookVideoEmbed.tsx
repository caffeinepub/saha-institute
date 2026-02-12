import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FacebookVideoEmbedProps {
  shareUrl: string;
  title: string;
}

export default function FacebookVideoEmbed({ shareUrl, title }: FacebookVideoEmbedProps) {
  // Extract video ID from Facebook share URL
  // Format: https://www.facebook.com/share/v/{VIDEO_ID}/
  const getEmbedUrl = (url: string): string | null => {
    try {
      const match = url.match(/\/v\/([^/]+)\/?/);
      if (match && match[1]) {
        const videoId = match[1];
        return `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fvideo.php%3Fv%3D${videoId}&show_text=false&width=560`;
      }
      return null;
    } catch (error) {
      console.error('Error parsing Facebook URL:', error);
      return null;
    }
  };

  const embedUrl = getEmbedUrl(shareUrl);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="absolute left-0 top-0 h-full w-full border-0"
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={title}
            />
          ) : (
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-muted">
              <p className="text-muted-foreground">Unable to load video embed</p>
            </div>
          )}
        </div>
        <div className="border-t bg-muted/30 p-4">
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Watch on Facebook
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 md:px-6">
      <Card className="w-full max-w-md border-2">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="mb-2 text-4xl font-bold">404</h1>
          <h2 className="mb-4 text-xl font-semibold">Page Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

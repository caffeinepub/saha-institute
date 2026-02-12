import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, AlertCircle } from 'lucide-react';

const ADMIN_ACCESS_CODE = '12345-QUICKLMOCK';

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const [accessCode, setAccessCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated && isVerified,
  });

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ADMIN_ACCESS_CODE) {
      setIsVerified(true);
      setError('');
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 md:px-6">
        <Card className="w-full max-w-md border-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <Lock className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Authentication Required</CardTitle>
            <CardDescription>You must be logged in to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate({ to: '/login' })} className="w-full" size="lg">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 md:px-6">
        <Card className="w-full max-w-md border-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>Enter the admin access code to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyCode} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="accessCode">Access Code</Label>
                <Input
                  id="accessCode"
                  type="password"
                  placeholder="Enter admin access code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Verify Access
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (checkingAdmin) {
    return (
      <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 md:px-6">
        <Card className="w-full max-w-md border-2">
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Verifying admin access...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 md:px-6">
        <Card className="w-full max-w-md border-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>You do not have admin privileges</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate({ to: '/' })} variant="outline" className="w-full" size="lg">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">Manage centres, announcements, and mock tests</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Centres</CardTitle>
              <CardDescription>Manage coaching centres and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Admin features coming soon</p>
            </CardContent>
          </Card>

          <Card className="border-2 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Create and manage announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Admin features coming soon</p>
            </CardContent>
          </Card>

          <Card className="border-2 transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Mock Tests</CardTitle>
              <CardDescription>Upload and manage mock test materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Admin features coming soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

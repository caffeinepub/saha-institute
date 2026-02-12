import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LogIn, LogOut, User } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const [userName, setUserName] = useState('');
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: userProfile, isLoading: profileLoading, isFetched } = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const saveProfileMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile({ name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      setShowProfileSetup(false);
      setUserName('');
    },
  });

  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && userProfile === null) {
      setShowProfileSetup(true);
    }
  }, [isAuthenticated, profileLoading, isFetched, userProfile]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      saveProfileMutation.mutate(userName.trim());
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12 md:px-6">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {isAuthenticated ? <User className="h-8 w-8 text-primary" /> : <LogIn className="h-8 w-8 text-primary" />}
          </div>
          <CardTitle className="text-2xl">
            {isAuthenticated ? 'Welcome Back!' : 'Login to Saha Institute'}
          </CardTitle>
          <CardDescription>
            {isAuthenticated
              ? 'You are successfully logged in'
              : 'Sign in with Internet Identity to access your account'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAuthenticated ? (
            <>
              {profileLoading ? (
                <div className="space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              ) : userProfile ? (
                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">Logged in as</p>
                  <p className="font-semibold">{userProfile.name}</p>
                </div>
              ) : null}
              <Button onClick={handleLogout} variant="outline" className="w-full" size="lg">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin} disabled={isLoggingIn} className="w-full" size="lg">
              {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={showProfileSetup} onOpenChange={setShowProfileSetup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogDescription>Please enter your name to continue</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={saveProfileMutation.isPending || !userName.trim()}>
              {saveProfileMutation.isPending ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

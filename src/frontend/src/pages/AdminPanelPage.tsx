import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Lock, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { effectPresets } from '@/components/effects/siteWideEffectPresets';
import AdminEffectPresetPreview from '@/components/effects/AdminEffectPresetPreview';
import { toast } from 'sonner';

const ADMIN_ACCESS_CODE = '12345-QUICKL';

export default function AdminPanelPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const [accessCode, setAccessCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  // Effects & Popups state
  const [selectedEffect, setSelectedEffect] = useState<string>('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVideoUrl, setPopupVideoUrl] = useState('');
  const [popupAudioUrl, setPopupAudioUrl] = useState('');

  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    refetchOnMount: true,
  });

  const unlockAdminMutation = useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error('Actor not available');
      const success = await actor.unlockAdminAccess(code);
      if (!success) {
        throw new Error('Invalid access code');
      }
      return success;
    },
    onSuccess: () => {
      setIsVerified(true);
      setError('');
      queryClient.invalidateQueries({ queryKey: ['isAdmin'] });
    },
    onError: (err: any) => {
      setError(err.message || 'Invalid access code. Please try again.');
    },
  });

  const triggerEffectMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (!selectedEffect) throw new Error('Please select an effect');
      
      const preset = effectPresets.find(p => p.id === selectedEffect);
      if (!preset) throw new Error('Invalid effect preset');

      return actor.triggerSiteWideEffect(
        preset.description,
        preset.id,
        'Admin Panel'
      );
    },
    onSuccess: () => {
      toast.success('Effect activated successfully!');
      queryClient.invalidateQueries({ queryKey: ['siteWideEffect'] });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to activate effect');
    },
  });

  const clearEffectMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.clearSiteWideEffect();
    },
    onSuccess: () => {
      toast.success('Effect cleared successfully!');
      queryClient.invalidateQueries({ queryKey: ['siteWideEffect'] });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to clear effect');
    },
  });

  const createPopupMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (!popupMessage.trim()) throw new Error('Please enter a popup message');

      return actor.createOrUpdatePopupAnnouncement(
        null,
        popupMessage,
        popupVideoUrl.trim() || null,
        popupAudioUrl.trim() || null
      );
    },
    onSuccess: () => {
      toast.success('Popup announcement created successfully!');
      setPopupMessage('');
      setPopupVideoUrl('');
      setPopupAudioUrl('');
      queryClient.invalidateQueries({ queryKey: ['popupAnnouncements'] });
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to create popup announcement');
    },
  });

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setError('System not ready. Please wait a moment and try again.');
      return;
    }
    unlockAdminMutation.mutate(accessCode);
  };

  const handleTriggerEffect = () => {
    triggerEffectMutation.mutate();
  };

  const handleClearEffect = () => {
    clearEffectMutation.mutate();
  };

  const handleCreatePopup = () => {
    createPopupMutation.mutate();
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

  if (!isVerified && !isAdmin) {
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
                  disabled={unlockAdminMutation.isPending}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={unlockAdminMutation.isPending}>
                {unlockAdminMutation.isPending ? 'Verifying...' : 'Verify Access'}
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
    <div className="admin-panel container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl admin-title">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">Manage centres, announcements, mock tests, and site-wide effects</p>
        </div>

        <div className="space-y-8">
          {/* Effects & Popups Section */}
          <Card className="admin-card border-2 shadow-lg transition-all hover:shadow-xl">
            <CardHeader className="admin-card-header">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Effects & Popups</CardTitle>
                  <CardDescription>Trigger site-wide visual effects and popup announcements</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Site-Wide Effects */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Site-Wide Effects</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearEffect}
                    disabled={clearEffectMutation.isPending}
                  >
                    {clearEffectMutation.isPending ? 'Clearing...' : 'Clear Active Effect'}
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="effect-preset">Select Effect Preset</Label>
                  <Select value={selectedEffect} onValueChange={setSelectedEffect}>
                    <SelectTrigger id="effect-preset">
                      <SelectValue placeholder="Choose an effect..." />
                    </SelectTrigger>
                    <SelectContent>
                      {effectPresets.map((preset) => (
                        <SelectItem key={preset.id} value={preset.id}>
                          {preset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedEffect && (
                  <AdminEffectPresetPreview
                    preset={effectPresets.find(p => p.id === selectedEffect)!}
                  />
                )}

                <Button
                  onClick={handleTriggerEffect}
                  disabled={!selectedEffect || triggerEffectMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {triggerEffectMutation.isPending ? 'Activating...' : 'Activate Effect'}
                </Button>
              </div>

              <div className="border-t pt-6">
                {/* Popup Announcements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20">
                      <MessageSquare className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold">Popup Announcements</h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="popup-message">Message *</Label>
                      <Textarea
                        id="popup-message"
                        placeholder="Enter popup announcement message..."
                        value={popupMessage}
                        onChange={(e) => setPopupMessage(e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="popup-video">Video URL (optional)</Label>
                      <Input
                        id="popup-video"
                        type="url"
                        placeholder="https://example.com/video.mp4"
                        value={popupVideoUrl}
                        onChange={(e) => setPopupVideoUrl(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="popup-audio">Audio URL (optional)</Label>
                      <Input
                        id="popup-audio"
                        type="url"
                        placeholder="https://example.com/audio.mp3"
                        value={popupAudioUrl}
                        onChange={(e) => setPopupAudioUrl(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCreatePopup}
                    disabled={!popupMessage.trim() || createPopupMutation.isPending}
                    className="w-full"
                    size="lg"
                  >
                    {createPopupMutation.isPending ? 'Creating...' : 'Create Popup Announcement'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Admin Features */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="admin-card border-2 transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <CardTitle>Centres</CardTitle>
                <CardDescription>Manage coaching centres and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Admin features coming soon</p>
              </CardContent>
            </Card>

            <Card className="admin-card border-2 transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Create and manage announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Admin features coming soon</p>
              </CardContent>
            </Card>

            <Card className="admin-card border-2 transition-all hover:shadow-lg hover:scale-[1.02]">
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
    </div>
  );
}

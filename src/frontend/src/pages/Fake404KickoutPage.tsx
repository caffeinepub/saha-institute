import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Home } from 'lucide-react';

export default function Fake404KickoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-950 via-black to-orange-950 p-4">
      <Card className="max-w-2xl w-full border-2 border-red-600/50 bg-black/90 backdrop-blur-sm animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <AlertTriangle className="h-24 w-24 text-red-600 animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-red-600/50 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-6xl font-bold text-red-600">
            404
          </CardTitle>
          <CardDescription className="text-2xl text-red-400">
            You've Been Kicked Out!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-3">
            <p className="text-lg text-red-300">
              The Fire Wheel has consumed your path...
            </p>
            <p className="text-base text-gray-400">
              You stayed idle too long in the Forest of Demons and triggered the Fire Wheel technique.
            </p>
            <p className="text-sm text-gray-500">
              The page you were on has been sealed away by flames.
            </p>
          </div>

          <div className="pt-6">
            <Link to="/">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-6 text-lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Return to Safety
              </Button>
            </Link>
          </div>

          <div className="pt-4 text-xs text-gray-600">
            <p>Error Code: FIRE_WHEEL_KICKOUT</p>
            <p className="mt-1">Timestamp: {new Date().toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

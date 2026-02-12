import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  const reviews = [
    {
      name: 'Priya Sharma',
      initials: 'PS',
      rating: 5,
      text: 'Excellent coaching! My daughter cleared the Navodaya entrance exam with great marks. The teachers are very supportive and dedicated.',
      location: 'Kolkata',
    },
    {
      name: 'Rajesh Kumar',
      initials: 'RK',
      rating: 5,
      text: 'Best coaching centre for Navodaya preparation. Small batch sizes ensure personal attention to every student.',
      location: 'Howrah',
    },
    {
      name: 'Anita Das',
      initials: 'AD',
      rating: 5,
      text: 'Highly recommended! The mock tests and study materials are excellent. My son is now studying in Navodaya Vidyalaya.',
      location: 'Durgapur',
    },
  ];

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Student Reviews</h1>
          <p className="text-lg text-muted-foreground">
            Hear from parents and students who achieved success with Saha Institute
          </p>
        </div>

        <div className="space-y-6">
          {reviews.map((review, index) => (
            <Card key={index} className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {review.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-primary/5 p-6 text-center">
          <p className="text-muted-foreground">
            Want to share your experience? Contact us at{' '}
            <a href="mailto:arivuedutainment@gmail.com" className="font-medium text-primary hover:underline">
              arivuedutainment@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

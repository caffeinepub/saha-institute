import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, MapPin } from 'lucide-react';
import FacebookVideoEmbed from '@/components/media/FacebookVideoEmbed';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <img
                src="/assets/generated/saha-logo-transparent-v2.dim_512x512.png"
                alt="Saha Institute"
                className="h-24 w-24 md:h-32 md:w-32"
              />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Welcome to Saha Institute
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Premier Navodaya Coaching Centre empowering students across West Bengal with quality education and
              personalized guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/centres">Find a Centre</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Learn More About Us</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Watch our videos to discover what makes Saha Institute the right choice for your education.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Important Video</h3>
              <FacebookVideoEmbed
                shareUrl="https://www.facebook.com/share/v/1DFxjp9oRq/"
                title="Important Video from Saha Institute"
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">Introduction to Saha Institute</h3>
              <FacebookVideoEmbed
                shareUrl="https://www.facebook.com/share/v/1K3RNjYEXa/"
                title="Introduction to Saha Institute"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Why Choose Saha Institute?</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We are committed to providing exceptional coaching and support to help students achieve their dreams.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Expert Faculty</CardTitle>
                <CardDescription>Experienced teachers dedicated to student success</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Small Batches</CardTitle>
                <CardDescription>Personalized attention for every student</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Proven Results</CardTitle>
                <CardDescription>Track record of successful Navodaya admissions</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multiple Centres</CardTitle>
                <CardDescription>Conveniently located across West Bengal</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to Start Your Journey?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of successful students who have achieved their dreams with Saha Institute.
            </p>
            <Button size="lg" asChild>
              <Link to="/centres">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogIn, Shield } from 'lucide-react';

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Courses & Fees', to: '/courses' },
    { label: 'Mock Tests', to: '/mock-tests' },
    { label: 'Centres', to: '/centres' },
    { label: 'Reviews', to: '/reviews' },
    { label: 'Announcements', to: '/announcements' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/generated/saha-logo-transparent-v2.dim_512x512.png"
            alt="Saha Institute"
            className="h-10 w-10 md:h-12 md:w-12"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground md:text-xl">Saha Institute</span>
            <span className="text-xs text-muted-foreground">Navodaya Coaching Centre</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button key={link.to} variant="ghost" asChild>
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
          <Button variant="ghost" asChild>
            <Link to="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin">
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-4 py-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <img
                  src="/assets/generated/saha-logo-transparent-v2.dim_512x512.png"
                  alt="Saha Institute"
                  className="h-10 w-10"
                />
                <div className="flex flex-col">
                  <span className="text-base font-bold leading-tight">Saha Institute</span>
                  <span className="text-xs text-muted-foreground">Navodaya Coaching</span>
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.to}
                    variant="ghost"
                    className="justify-start"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={link.to}>{link.label}</Link>
                  </Button>
                ))}
                <Button variant="ghost" className="justify-start" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/admin">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

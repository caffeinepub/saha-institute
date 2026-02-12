import { Link, useNavigate } from '@tanstack/react-router';
import { SiFacebook, SiYoutube } from 'react-icons/si';
import { Heart, Phone, Mail } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'saha-institute');
  const navigate = useNavigate();

  const handleSecretNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate({ to: '/forest-of-demons' });
  };

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
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
            <p className="text-sm text-muted-foreground">
              Empowering students across West Bengal with quality education and dedicated coaching for Navodaya
              entrance exams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="text-muted-foreground transition-colors hover:text-foreground">
                  Courses & Fees
                </Link>
              </li>
              <li>
                <Link to="/mock-tests" className="text-muted-foreground transition-colors hover:text-foreground">
                  Mock Tests
                </Link>
              </li>
              <li>
                <Link to="/centres" className="text-muted-foreground transition-colors hover:text-foreground">
                  Our Centres
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground transition-colors hover:text-foreground">
                  Student Reviews
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-muted-foreground transition-colors hover:text-foreground">
                  Announcements
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground transition-colors hover:text-foreground">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:9932224569" className="transition-colors hover:text-foreground">
                  99322 24569
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:arivuedutainment@gmail.com" className="transition-colors hover:text-foreground">
                  arivuedutainment@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://youtube.com/@quickl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="YouTube Channel"
              >
                <SiYoutube className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1B3cTZrniU/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook Page"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {currentYear} Saha Institute. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              onClick={handleSecretNavigation}
              className="font-medium transition-colors hover:text-foreground cursor-pointer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

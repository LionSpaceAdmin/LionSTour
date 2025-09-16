'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/experiences', label: 'Explore' },
  { href: '/guides', label: 'Guides' },
  { href: '/plan', label: 'Plan' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        (isScrolled || !isHomePage) ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-primary">TheLionsOfJudah</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={cn("transition-colors", (isScrolled || !isHomePage) ? "hover:text-primary" : "text-white hover:text-primary/80")}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className={cn('text-lg', (isScrolled || !isHomePage) ? '' : 'text-white hover:bg-white/10')}>Log In</Button>
          <Button className="text-lg">Sign Up</Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background text-foreground">
              <div className="grid gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
                  <Shield className="h-8 w-8" />
                  <span>TheLionsOfJudah</span>
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-4 mt-4 border-t pt-6">
                    <Button variant="ghost">Log In</Button>
                    <Button>Sign Up</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

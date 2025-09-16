import Link from 'next/link';
import { Shield, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
              <Shield className="h-8 w-8 text-primary" />
              <span>TheLionsOfJudah</span>
            </Link>
            <p className="text-muted-foreground text-sm">Discover Israel through the people who live it.</p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/experiences" className="text-sm text-muted-foreground hover:text-primary">Experiences</Link></li>
              <li><Link href="/guides" className="text-sm text-muted-foreground hover:text-primary">Our Guides</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TheLionsOfJudah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { Shield, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer({ lang, dict }: { lang: string, dict: any }) {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href={`/${lang}`} className="flex items-center gap-2 font-headline text-2xl font-bold text-primary">
              <Shield className="h-8 w-8 text-primary" />
              <span>TheLionsOfJudah</span>
            </Link>
            <p className="text-muted-foreground text-sm">{dict.footer.tagline}</p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">{dict.footer.explore}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/experiences`} className="text-sm text-muted-foreground hover:text-primary">{dict.footer.experiences}</Link></li>
              <li><Link href={`/${lang}/guides`} className="text-sm text-muted-foreground hover:text-primary">{dict.footer.our_guides}</Link></li>
              <li><Link href={`/${lang}/about`} className="text-sm text-muted-foreground hover:text-primary">{dict.footer.about_us}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">{dict.footer.support}</h4>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/faq`} className="text-sm text-muted-foreground hover:text-primary">{dict.footer.faq}</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-sm text-muted-foreground hover:text-primary">{dict.footer.contact}</Link></li>
              <li><Link href={`/${lang}/privacy`} className="text-sm text-muted-foreground hover:text-primary">{dict.footer.privacy_policy}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">{dict.footer.follow_us}</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TheLionsOfJudah. {dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

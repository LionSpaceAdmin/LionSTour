'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ lang, className }: { lang: string, className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const locales = ['en', 'he', 'ar', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'el', 'tr', 'ru', 'uk', 'sr', 'hr', 'bs', 'sl', 'lt', 'lv', 'et', 'is'];
  const localeNames: { [key: string]: string } = {
    en: 'English', he: 'עברית', ar: 'العربية', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português',
    nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', pl: 'Polski', cs: 'Čeština', sk: 'Slovenčina',
    hu: 'Magyar', ro: 'Română', bg: 'Български', el: 'Ελληνικά', tr: 'Türkçe', ru: 'Русский', uk: 'Українська',
    sr: 'Српски', hr: 'Hrvatski', bs: 'Bosanski', sl: 'Slovenščina', lt: 'Lietuvių', lv: 'Latviešu', et: 'Eesti', is: 'Íslenska'
  };


  const handleLocaleChange = (newLocale: string) => {
    // Replace the current locale in the pathname with the new one
    const newPath = pathname.replace(`/${lang}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(className)}>
          <Languages className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={cn(lang === locale && 'font-bold')}
          >
            {localeNames[locale] || locale.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

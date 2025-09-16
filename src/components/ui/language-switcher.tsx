'use client';

import { useI18n } from '@/hooks/useI18n';
import Image from 'next/image';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center space-x-2 p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
      <button
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ease-in-out
          ${locale === 'en' ? 'bg-white/30 scale-105' : 'hover:bg-white/20'}
        `}
      >
        <Image src="/flags/us.svg" alt="English Flag" width={20} height={20} className="rounded-full" />
      </button>
      <button
        onClick={() => setLocale('he')}
        aria-label="Switch to Hebrew"
        aria-pressed={locale === 'he'}
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ease-in-out
          ${locale === 'he' ? 'bg-white/30 scale-105' : 'hover:bg-white/20'}
        `}
      >
        <Image src="/flags/il.svg" alt="Hebrew Flag" width={20} height={20} className="rounded-full" />
      </button>
    </div>
  );
}

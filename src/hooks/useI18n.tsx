'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import enMessages from '../../messages/en.json';
import heMessages from '../../messages/he.json';

type Locale = 'en' | 'he';
type Messages = typeof enMessages;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const messages: Record<Locale, Messages> = {
  en: enMessages,
  he: heMessages,
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      <div dir={locale === 'he' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
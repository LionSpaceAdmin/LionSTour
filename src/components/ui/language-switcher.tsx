'use client';

import { useI18n } from '@/hooks/useI18n';

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('he')}
        aria-label="Switch to Hebrew"
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'he'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        עב
      </button>
    </div>
  );
}

'use client';

import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('HomePage.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            {t('HomePage.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/experiences"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('HomePage.exploreExperiences')}
            </Link>
            <Link
              href="/plan"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('HomePage.planJourney')}
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">🎖️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('HomePage.veteranGuides')}</h3>
            <p className="text-gray-600">
              {t('HomePage.veteranGuidesDesc')}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('HomePage.safeTravel')}</h3>
            <p className="text-gray-600">
              {t('HomePage.safeTravelDesc')}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('HomePage.diverseCommunities')}</h3>
            <p className="text-gray-600">
              {t('HomePage.diverseCommunitiesDesc')}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('HomePage.startJourney')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/academy" className="text-blue-600 hover:text-blue-800 font-medium">
              {t('Navigation.academy')}
            </Link>
            <Link href="/trust/safety" className="text-blue-600 hover:text-blue-800 font-medium">
              {t('Common.trustSafety')}
            </Link>
            <Link href="/enterprise" className="text-blue-600 hover:text-blue-800 font-medium">
              {t('Common.enterprise')}
            </Link>
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
              {t('Navigation.login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { AdminTeamPlaceLink } from "@/components/AdminTeamPlaceLink";

export function Header() {
    const { t } = useI18n();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav
          role="navigation"
          aria-label={t("Accessibility.mainNavigation")}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/20"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 9999 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-white hover:text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
                        aria-label={t("Accessibility.logo")}
                    >
                        <span aria-hidden="true">🦁</span>
                        <span className="ms-2">{t("Common.logo")}</span>
                    </Link>
                </div>
              <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
                <Link
                  href="/experiences"
                  className="text-white/90 hover:text-white transition-colors font-medium rounded-md px-3 py-2"
                >
                  {t("Navigation.experiences")}
                </Link>
                <Link
                  href="/guides"
                  className="text-white/90 hover:text-white transition-colors font-medium rounded-md px-3 py-2"
                >
                  {t("Navigation.guides")}
                </Link>
                <Link
                  href="/academy"
                  className="text-white/90 hover:text-white transition-colors font-medium rounded-md px-3 py-2"
                >
                  {t("Navigation.academy")}
                </Link>
                <Link
                  href="/trust/safety"
                  className="text-white/90 hover:text-white transition-colors font-medium rounded-md px-3 py-2"
                >
                  {t("Navigation.safety")}
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <AdminTeamPlaceLink />
                <div className="hidden md:flex items-center gap-4">
                    <Link
                    href="/auth/login"
                    className="px-6 py-2 rounded-full bg-transparent border-2 border-white/30 text-white shadow-md backdrop-blur-sm hover:bg-white/20 hover:border-white/50 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        <span aria-hidden="true">👤</span>
                        <span className="sr-only md:not-sr-only ms-2">
                            {t("Navigation.login")}
                        </span>
                    </Link>
                    <Link
                    href="/plan"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        <span aria-hidden="true">✨</span>
                        <span className="ms-2">{t("Navigation.planJourney")}</span>
                    </Link>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  type="button"
                  aria-label={isMobileMenuOpen ? t("Accessibility.closeMenu") : t("Accessibility.openMenu")}
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md p-2 transition-colors hover:bg-white/10"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/experiences" className="text-white/90 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("Navigation.experiences")}</Link>
                <Link href="/guides" className="text-white/90 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("Navigation.guides")}</Link>
                <Link href="/academy" className="text-white/90 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("Navigation.academy")}</Link>
                <Link href="/trust/safety" className="text-white/90 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{t("Navigation.safety")}</Link>
              </div>
            </div>
          )}
        </nav>
    );
}

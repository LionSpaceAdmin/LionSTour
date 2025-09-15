"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { EmotionalHero as Hero } from "@/components/hero";
import { AIJourneyPlanner } from "@/components/ai-journey-planner";
import VideoBackground from "@/components/VideoBackground";
import PlannerOverlay from "@/components/PlannerOverlay";
import ScrollScene from "@/components/ScrollScene";

// Enhanced lazy-loading with beautiful skeleton screens
const PersonalStories = dynamic(
  () => import("@/components/personal-stories").then((m) => m.PersonalStories),
  {
    loading: () => (
      <div className="container mx-auto px-6 py-20">
        <div className="glass-subtle rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded-md mb-4 w-1/2 animate-shimmer" />
          <div className="h-4 bg-white/15 rounded mb-3 w-3/4" />
          <div className="h-4 bg-white/15 rounded mb-6 w-2/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-white/10 rounded-xl animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

const CommunityShowcase = dynamic(
  () =>
    import("@/components/community-showcase").then((m) => m.CommunityShowcase),
  {
    loading: () => (
      <div className="container mx-auto px-6 py-16">
        <div className="glass-subtle rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded-md mb-4 w-1/3 animate-shimmer" />
          <div className="h-32 bg-white/10 rounded-xl" />
        </div>
      </div>
    ),
    ssr: false,
  }
);

const ExperienceWindowsPreview = dynamic(
  () =>
    import("@/components/experience-windows-preview").then(
      (m) => m.ExperienceWindowsPreview
    ),
  {
    loading: () => (
      <div className="container mx-auto px-6 py-16">
        <div className="glass-subtle rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded-md mb-6 w-1/2 animate-shimmer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-64 bg-white/10 rounded-xl animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

const CallToAction = dynamic(
  () => import("@/components/call-to-action").then((m) => m.CallToAction),
  {
    loading: () => (
      <div className="container mx-auto px-6 py-16">
        <div className="glass-intense rounded-2xl p-8 text-center animate-pulse">
          <div className="h-10 bg-white/20 rounded-md mb-4 w-2/3 mx-auto animate-shimmer" />
          <div className="h-4 bg-white/15 rounded mb-8 w-1/2 mx-auto" />
          <div className="h-12 bg-white/20 rounded-full w-48 mx-auto" />
        </div>
      </div>
    ),
    ssr: false,
  }
);

export default function Home() {
  const { t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Performance optimization: preload critical resources
  useEffect(() => {
    // Preload critical images/videos for faster loading
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    preloadLink.href = "/video-poster.jpg";
    document.head.appendChild(preloadLink);

    // Cleanup
    return () => {
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink);
      }
    };
  }, []);

  return (
      <div className="relative min-h-screen w-full">
        {/* Skip to content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999]
                   bg-white text-gray-900 px-6 py-3 rounded-md font-medium shadow-lg
                   transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          דלג לתוכן הראשי / Skip to main content
        </a>
        <VideoBackground />
        <PlannerOverlay />
        {/* Modern Navigation Bar with Enhanced ARIA */}
        <nav
          role="navigation"
          aria-label="ניווט ראשי - LionSTour"
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/20"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 9999 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo with enhanced accessibility */}
              <Link
                href="/"
                className="text-2xl font-bold text-white hover:text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-2 py-1"
                aria-label="לוגו LionSTour - חזרה לעמוד הבית"
              >
                <span aria-hidden="true">🦁</span>
                <span className="ml-2">LionSTour</span>
              </Link>

              {/* Enhanced Hamburger Menu for Mobile */}
              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  aria-label={
                    isMobileMenuOpen ? "סגור תפריט ניווט" : "פתח תפריט ניווט"
                  }
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-primary-menu"
                  aria-haspopup="true"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-md p-2 transition-colors hover:bg-white/10"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    )}
                  </svg>
                </button>
              </div>

              {/* Enhanced Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-8" role="menubar">
                <Link
                  href="/experiences"
                  role="menuitem"
                  className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-3 py-2"
                  aria-label="חוויות תיירות - גלה חוויות מרתקות בישראל"
                >
                  {t("Navigation.experiences")}
                </Link>
                <Link
                  href="/guides"
                  role="menuitem"
                  className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-3 py-2"
                  aria-label="מדריכים - פגש את המדריכים המקומיים שלנו"
                >
                  {t("Navigation.guides")}
                </Link>
                <Link
                  href="/academy"
                  role="menuitem"
                  className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-3 py-2"
                  aria-label="אקדמיה - למד על תרבות וההיסטוריה הישראלית"
                >
                  {t("Navigation.academy")}
                </Link>
                <Link
                  href="/trust/safety"
                  role="menuitem"
                  className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-md px-3 py-2"
                  aria-label="בטיחות ואמון - מידע על בטיחות ואמינות הפלטפורמה"
                >
                  {t("Navigation.safety")}
                </Link>
              </div>

              {/* Enhanced Right Side with accessibility */}
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <Link
                  href="/auth/login"
                  className="px-6 py-2 rounded-full bg-transparent border-2 border-white/30 text-white shadow-md backdrop-blur-sm hover:bg-white/20 hover:border-white/50 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  aria-label="התחברות - היכנס לחשבון שלך"
                >
                  <span aria-hidden="true">👤</span>
                  <span className="sr-only md:not-sr-only ml-2">
                    {t("Navigation.login")}
                  </span>
                </Link>
                <Link
                  href="/plan"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse"
                  aria-label="תכנון מסע - התחל לתכנן את הטיול שלך בישראל"
                >
                  <span aria-hidden="true">✨</span>
                  <span className="ml-2">{t("Navigation.planJourney")}</span>
                </Link>
              </div>
            </div>
          </div>
          {/* Enhanced Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              id="mobile-primary-menu"
              className="md:hidden absolute top-full left-0 right-0 glass-dark backdrop-blur-xl py-6 px-6 border-t border-white/10 animate-fade-in"
              role="menu"
              aria-label="תפריט ניווט נייד"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsMobileMenuOpen(false);
                }
              }}
            >
              <div className="flex flex-col gap-6">
                <div
                  className="flex flex-col gap-4"
                  role="group"
                  aria-label="קישורי ניווט"
                >
                  <Link
                    href="/experiences"
                    role="menuitem"
                    className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded-md px-3 py-2 flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="חוויות תיירות בישראל"
                  >
                    <span aria-hidden="true">🏛️</span>
                    {t("Navigation.experiences")}
                  </Link>
                  <Link
                    href="/guides"
                    role="menuitem"
                    className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded-md px-3 py-2 flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="מדריכים מקומיים מנוסים"
                  >
                    <span aria-hidden="true">👨‍🏫</span>
                    {t("Navigation.guides")}
                  </Link>
                  <Link
                    href="/academy"
                    role="menuitem"
                    className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded-md px-3 py-2 flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="אקדמיה ללימוד תרבות ישראל"
                  >
                    <span aria-hidden="true">📚</span>
                    {t("Navigation.academy")}
                  </Link>
                  <Link
                    href="/trust/safety"
                    role="menuitem"
                    className="text-white/90 hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded-md px-3 py-2 flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="בטיחות ואמינות הפלטפורמה"
                  >
                    <span aria-hidden="true">🛡️</span>
                    {t("Navigation.safety")}
                  </Link>
                </div>

                <div
                  className="border-t border-white/20 pt-4"
                  role="group"
                  aria-label="פעולות משתמש"
                >
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/auth/login"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-transparent border-2 border-white/30 text-white shadow-md backdrop-blur-sm hover:bg-white/20 hover:border-white/50 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="התחברות לחשבון אישי"
                    >
                      <span aria-hidden="true">👤</span>
                      {t("Navigation.login")}
                    </Link>
                    <Link
                      href="/plan"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="התחל לתכנן את המסע שלך עכשיו"
                    >
                      <span aria-hidden="true">✨</span>
                      {t("Navigation.planJourney")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content with top padding for fixed nav */}
        <main id="main-content" className="relative z-20 pt-20">
          <Hero />
          <AIJourneyPlanner />
          <ScrollScene speed={0.18}>
            <PersonalStories />
          </ScrollScene>
          <ScrollScene speed={0.2}>
            <CommunityShowcase />
          </ScrollScene>
          <ScrollScene speed={0.22}>
            <ExperienceWindowsPreview />
          </ScrollScene>
          <ScrollScene speed={0.24}>
            <CallToAction />
          </ScrollScene>
        </main>
      </div>
  );
}

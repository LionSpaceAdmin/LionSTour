import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "@/lib/envFallback";
import "./globals.css";
import { I18nProvider } from "@/hooks/useI18n";
import { ClientChatWidget } from "@/components/ClientChatWidget";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "גלה את ישראל - חוויות תיירות אותנטיות | LionSTour",
  description:
    "גלה את ישראל דרך האנשים שחיים אותה – פלטפורמת חוויות תיירות אותנטיות, מונעות סיפור ובטוחות עם חיילים משוחררים מקומיים וקהילות מגוונות",
  keywords: [
    "ישראל",
    "תיירות",
    "חוויות אותנטיות",
    "משוחררים",
    "קהילות מגוונות",
    "נסיעות בטוחות",
    "Israel tourism",
    "authentic experiences",
    "veterans",
    "diverse communities",
  ],
  authors: [{ name: "LionSTour Team" }],
  creator: "LionSTour",
  publisher: "LionSTour",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lionstour.com"),
  alternates: {
    canonical: "/",
    languages: {
      he: "/he",
      en: "/en",
    },
  },
  openGraph: {
    title: "גלה את ישראל - חוויות תיירות אותנטיות",
    description:
      "גלה את ישראל דרך האנשים שחיים אותה – נסיעות אותנטיות, מונעות סיפור ובטוחות",
    url: "https://lionstour.com",
    siteName: "LionSTour",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "גלה את ישראל - LionSTour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "גלה את ישראל - חוויות תיירות אותנטיות",
    description:
      "גלה את ישראל דרך האנשים שחיים אותה – נסיעות אותנטיות, מונעות סיפור ובטוחות",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preload" as="image" href="/video-poster.jpg" />
      </head>
      <body className={`${heebo.variable} antialiased font-heebo min-h-screen`}>
        {/* Skip link for keyboard users */}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-2 focus:left-2 focus:rounded focus:bg-black focus:text-white focus:px-4 focus:py-2">
          דלג לתוכן
        </a>
        <I18nProvider>
          <main id="main" className="min-h-screen w-full">{children}</main>
          {/* Floating AI chat assistant */}
          <ClientChatWidget />
        </I18nProvider>
      </body>
    </html>
  );
}

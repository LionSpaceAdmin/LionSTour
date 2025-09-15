import "./globals.css";
import "./fonts.css";
import { I18nProvider } from "@/hooks/useI18n";
import { Header } from "@/components/layout/Header";
import { ClientChatWidgetGate } from "@/components/ClientChatWidgetGate";

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
      <body className="antialiased font-heebo min-h-screen bg-black">
        <I18nProvider>
          <Header />
          <main id="main" className="min-h-screen w-full">
            {children}
          </main>
          <ClientChatWidgetGate />
        </I18nProvider>
      </body>
    </html>
  );
}

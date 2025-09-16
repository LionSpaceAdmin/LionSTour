import type { Metadata } from 'next';
import '../globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { getDictionary } from '@/lib/dictionaries';

export const metadata: Metadata = {
  title: 'TheLionsOfJudah',
  description: 'Discover Israel through the people who live it.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const dict = await getDictionary(params.lang);
  
  return (
    <html lang={params.lang} dir={dict._dir || 'ltr'} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Oswald:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <Header lang={params.lang} dict={dict} />
        <main>{children}</main>
        <Footer lang={params.lang} dict={dict} />
        <Toaster />
      </body>
    </html>
  );
}

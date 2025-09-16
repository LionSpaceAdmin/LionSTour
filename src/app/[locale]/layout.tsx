import heMessages from '../../../messages/he.json';
import enMessages from '../../../messages/en.json';

export async function generateMetadata({ params: { locale } }: { params: { locale: 'he' | 'en' } }) {
  const dict = locale === 'he' ? heMessages : enMessages;
  const title = (dict as any)?.Layout?.title ?? 'LionSTour';
  const description = (dict as any)?.Layout?.description ?? '';
  return { title, description };
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Child layouts must not render <html> or <body>; root layout handles shell and providers
  return children;
}

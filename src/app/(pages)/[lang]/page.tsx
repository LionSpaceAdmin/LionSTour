import { Hero } from '@/components/home/hero';
import { ActionGrid } from '@/components/home/action-grid';
import { TrustStrip } from '@/components/home/trust-strip';
import { JourneyCarousel } from '@/components/home/journey-carousel';
import { mockExperiences } from '@/lib/mock-data';
import { getDictionary } from '@/lib/dictionaries';

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  return (
    <>
      <Hero dict={dict} lang={lang} />
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 space-y-16 md:space-y-24">
        <ActionGrid dict={dict} lang={lang} />
        <TrustStrip />
        <JourneyCarousel lang={lang} title="Continue Your Journey" experiences={mockExperiences.slice(0, 4)} />
        <JourneyCarousel lang={lang} title="Recently Viewed" experiences={mockExperiences.slice(2, 6)} />
      </div>
    </>
  );
}

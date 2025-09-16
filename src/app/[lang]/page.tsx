import { Hero } from '@/components/home/hero';
import { ActionGrid } from '@/components/home/action-grid';
import { TrustStrip } from '@/components/home/trust-strip';
import { JourneyCarousel } from '@/components/home/journey-carousel';
import { mockExperiences } from '@/lib/mock-data';
import { getDictionary } from '@/lib/dictionaries';

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang);
  return (
    <>
      <Hero dict={dict} />
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 space-y-16 md:space-y-24">
        <ActionGrid dict={dict} />
        <TrustStrip />
        <JourneyCarousel lang={lang} title="Continue Your Journey" experiences={mockExperiences.slice(0, 4)} />
        <JourneyCarousel lang={lang} title="Recently Viewed" experiences={mockExperiences.slice(2, 6)} />
      </div>
    </>
  );
}

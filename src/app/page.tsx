import { Hero } from '@/components/home/hero';
import { ActionGrid } from '@/components/home/action-grid';
import { TrustStrip } from '@/components/home/trust-strip';
import { JourneyCarousel } from '@/components/home/journey-carousel';
import { mockExperiences } from '@/lib/mock-data';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 space-y-16 md:space-y-24">
        <ActionGrid />
        <TrustStrip />
        <JourneyCarousel title="Continue Your Journey" experiences={mockExperiences.slice(0, 4)} />
        <JourneyCarousel title="Recently Viewed" experiences={mockExperiences.slice(2, 6)} />
      </div>
    </>
  );
}

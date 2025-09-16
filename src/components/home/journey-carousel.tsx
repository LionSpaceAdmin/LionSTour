import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ExperienceCard } from './experience-card';
import type { Experience } from '@/lib/mock-data';

type JourneyCarouselProps = {
  title: string;
  experiences: Experience[];
};

export function JourneyCarousel({ title, experiences }: JourneyCarouselProps) {
  return (
    <section>
      <h2 className="text-3xl font-headline font-bold mb-8 text-foreground">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {experiences.map((experience) => (
            <CarouselItem key={experience.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Link href={`/experiences/${experience.id}`} className="block h-full">
                <ExperienceCard experience={experience} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}

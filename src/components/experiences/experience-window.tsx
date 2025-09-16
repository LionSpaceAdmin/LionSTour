import Link from 'next/link';
import { ExperienceCard } from '@/components/home/experience-card';
import type { Experience } from '@/lib/mock-data';

type ExperienceWindowProps = {
  experience: Experience;
};

export function ExperienceWindow({ experience }: ExperienceWindowProps) {
  return (
    <Link href={`/experiences/${experience.id}`} className="block h-full">
      <ExperienceCard experience={experience} />
    </Link>
  );
}

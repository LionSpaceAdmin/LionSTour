import Link from 'next/link';
import { ExperienceCard } from '@/components/home/experience-card';
import type { Experience } from '@/lib/mock-data';

type ExperienceWindowProps = {
  experience: Experience;
  lang: string;
};

export function ExperienceWindow({ experience, lang }: ExperienceWindowProps) {
  return (
    <Link href={`/${lang}/experiences/${experience.id}`} className="block h-full">
      <ExperienceCard experience={experience} />
    </Link>
  );
}

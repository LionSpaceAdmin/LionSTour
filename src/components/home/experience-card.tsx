import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Experience } from '@/lib/mock-data';
import { Clock, TrendingUp } from 'lucide-react';
import { AIImage } from '../common/ai-image';

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <AIImage
          imageId={experience.image.id}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {experience.familyFriendly && (
           <Badge variant="secondary" className="absolute top-3 right-3">Family Friendly</Badge>
        )}
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-headline text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
          {experience.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{experience.storyHook}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{experience.duration} days</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" />
          <span className="capitalize">{experience.difficulty}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

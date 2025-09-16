import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Guide } from '@/lib/mock-guides';
import { ShieldCheck, Languages, Heart, Clock, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';

type GuideCardProps = {
  guide: Guide;
};

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 group">
       <CardHeader className="p-0 relative">
            <div className="aspect-square relative">
                <Image
                    src={guide.avatar.imageUrl}
                    alt={`Portrait of ${guide.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint={guide.avatar.imageHint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-4">
                 <h3 className="font-headline text-2xl font-bold text-white leading-tight">
                    {guide.name}
                </h3>
                <p className="text-sm text-primary-foreground/80">{guide.title}</p>
            </div>
            <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-white hover:text-red-500 hover:bg-white/20">
                <Heart className="w-6 h-6" />
                <span className="sr-only">Save guide</span>
            </Button>
       </CardHeader>
      <CardContent className="p-4 flex-grow">
         {guide.verified && (
            <Badge variant="secondary" className="mb-4">
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                Verified Veteran Guide
            </Badge>
         )}
        <p className="text-sm text-muted-foreground">{guide.storyHook}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-4 items-start">
        <div className="w-full space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                <span>{guide.languages.join(', ')}</span>
            </div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Responds in ~{guide.responseTime}</span>
            </div>
        </div>
        <Button asChild className="w-full">
            <Link href={`/guides/${guide.id}`}>
                <UserPlus className="mr-2 h-4 w-4" />
                View Profile
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

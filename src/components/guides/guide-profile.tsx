import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GuideReviews } from '@/components/guides/guide-reviews';
import type { Guide } from '@/lib/mock-guides';
import { ShieldCheck, Languages, Clock, Star, MessageSquare, UserPlus } from 'lucide-react';
import Link from 'next/link';

type GuideProfileProps = {
  guide: Guide;
};

export function GuideProfile({ guide }: GuideProfileProps) {
  return (
    <div>
      <section className="relative h-64 md:h-96 w-full -mt-20">
        <Image
          src={guide.heroImage.imageUrl}
          alt={`Landscape associated with ${guide.name}`}
          fill
          priority
          className="object-cover"
          data-ai-hint={guide.heroImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </section>

      <div className="container mx-auto px-4 md:px-6 -mt-24 md:-mt-32">
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="relative aspect-square w-48 h-48 md:w-full md:h-auto rounded-full md:rounded-xl overflow-hidden border-4 border-background shadow-2xl mx-auto">
                        <Image
                            src={guide.avatar.imageUrl}
                            alt={`Portrait of ${guide.name}`}
                            fill
                            className="object-cover"
                            data-ai-hint={guide.avatar.imageHint}
                        />
                    </div>
                     <div className="p-6 bg-card rounded-xl shadow-lg mt-6 hidden md:block">
                        <h3 className="text-xl font-headline font-bold mb-4">Quick Info</h3>
                         <div className="space-y-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span>Verified Veteran Guide</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Languages className="w-5 h-5 text-primary" />
                                <span>{guide.languages.join(', ')}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-primary" />
                                <span>Responds in ~{guide.responseTime}</span>
                            </div>
                             <div className="flex items-center gap-3">
                                <Star className="w-5 h-5 text-primary" />
                                <span>{guide.rating} ({guide.reviews.length} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-4xl font-headline font-bold text-primary">{guide.name}</h1>
                                <p className="text-lg text-muted-foreground font-medium">{guide.title}</p>
                            </div>
                             <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                <Button size="lg" asChild>
                                    <Link href="/plan">
                                        <UserPlus className="mr-2 h-5 w-5" />
                                        Plan with {guide.name.split(' ')[0]}
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline">
                                    <MessageSquare className="mr-2 h-5 w-5" />
                                    Message
                                </Button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-headline font-semibold mb-2">My Story</h2>
                            <p className="text-foreground/80 whitespace-pre-wrap">{guide.bio}</p>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <GuideReviews reviews={guide.reviews} rating={guide.rating} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

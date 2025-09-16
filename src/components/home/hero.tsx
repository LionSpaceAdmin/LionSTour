'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, DraftingCompass } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-desktop');
  
  if (!heroImage) {
    return null;
  }

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white -mt-20">
      <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        priority
        className="object-cover"
        data-ai-hint={heroImage.imageHint}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-shadow-lg leading-tight animate-fade-in-down">
          Discover Israel Through The People Who Live It
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl mx-auto text-shadow animate-fade-in-up">
          Authentic, story-driven journeys guided by local veterans and communities. Experience Israel with soul.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/experiences">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white/50 bg-white/10 hover:bg-white/20 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/plan">
              Plan with AI <DraftingCompass className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 0 2px 15px rgba(0,0,0,0.5);
        }
        .text-shadow {
          text-shadow: 0 1px 10px rgba(0,0,0,0.5);
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
}

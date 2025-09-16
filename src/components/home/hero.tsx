'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, DraftingCompass } from 'lucide-react';
import { AIImage } from '@/components/common/ai-image';

export function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white -mt-20">
      <AIImage
        imageId="hero-desktop"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-shadow-lg leading-tight animate-fade-in-down">
          Discover Israel Through Its People
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl mx-auto text-shadow animate-fade-in-up">
          Authentic guides. Real stories. Safe, simple booking.
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
          <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/experiences">
              Explore Experiences <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white/50 bg-white/10 hover:bg-white/20 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/plan">
              Plan Your Journey <DraftingCompass className="ml-2 h-5 w-5" />
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

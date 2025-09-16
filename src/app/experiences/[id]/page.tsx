import { mockExperiences } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GuideCard } from "@/components/guides/guide-card";
import { mockGuides } from "@/lib/mock-guides";
import { AIImage } from "@/components/common/ai-image";


export default function ExperiencePage({ params }: { params: { id: string } }) {
  const experience = mockExperiences.find((exp) => exp.id === params.id);

  if (!experience) {
    notFound();
  }

  // Find a mock guide to associate with the experience
  const guide = mockGuides.find(g => g.id === '1');

  return (
    <div>
        <section className="relative h-80 md:h-[50vh] w-full -mt-20">
            <AIImage
              imageId={experience.image.id}
              alt={experience.image.description}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
             <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 text-white">
                <div className="max-w-4xl">
                     <h1 className="text-4xl md:text-6xl font-headline font-bold text-shadow-lg leading-tight">
                        {experience.title}
                    </h1>
                     <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-lg items-center">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>{experience.duration} days</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            <span className="capitalize">{experience.difficulty}</span>
                        </div>
                        {experience.familyFriendly && (
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                <span>Family Friendly</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-3xl font-headline font-semibold mb-4">The Story</h2>
                        <p className="text-lg text-foreground/80 whitespace-pre-wrap">{experience.storyHook} This is a placeholder for a much longer and more detailed story about the experience. It would go into the history, the emotional connection, and what makes this journey unique. It would be written in a captivating, narrative style to draw the user in.</p>
                    </div>
                     <div>
                        <h2 className="text-3xl font-headline font-semibold mb-4">What You'll Do</h2>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                            <li>Placeholder activity one that sounds engaging.</li>
                            <li>Another placeholder activity that gives a sense of adventure.</li>
                            <li>A third one that hints at cultural immersion.</li>
                            <li>And a final one about relaxation or reflection.</li>
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-6">
                         {guide && (
                            <div>
                                <h3 className="text-2xl font-headline font-semibold mb-4">Your Guide</h3>
                                <GuideCard guide={guide} />
                            </div>
                         )}

                        <div className="p-6 bg-card rounded-xl shadow-lg">
                             <h3 className="text-2xl font-headline font-bold mb-4">Ready to Go?</h3>
                             <Button size="lg" className="w-full" asChild>
                                <Link href="/plan">Plan Your Journey</Link>
                             </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

// Optional: Generate static pages for each experience for better performance
export async function generateStaticParams() {
  return mockExperiences.map((exp) => ({
    id: exp.id,
  }));
}

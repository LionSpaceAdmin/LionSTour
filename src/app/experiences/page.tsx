import { ExperienceWindow } from "@/components/experiences/experience-window";
import { StoryFilters } from "@/components/experiences/story-filters";
import { mockExperiences } from "@/lib/mock-data";

export default function ExperiencesPage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Explore Our Experiences</h1>
        <p className="mt-4 text-lg text-muted-foreground">Find the journey that speaks to your soul.</p>
      </div>

      <StoryFilters />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {mockExperiences.map(exp => (
          <ExperienceWindow key={exp.id} experience={exp} lang={lang} />
        ))}
      </div>
    </div>
  );
}

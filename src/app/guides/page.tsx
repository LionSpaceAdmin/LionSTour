import { GuideCard } from "@/components/guides/guide-card";
import { mockGuides } from "@/lib/mock-guides";

export default function GuidesPage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Meet Our Guides</h1>
        <p className="mt-4 text-lg text-muted-foreground">The heart and soul of your journey. Each guide is a vetted veteran with a unique story to share.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockGuides.map(guide => (
          <GuideCard key={guide.id} guide={guide} lang={lang} />
        ))}
      </div>
    </div>
  );
}

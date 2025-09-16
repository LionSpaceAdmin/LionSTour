import { GuideProfile } from "@/components/guides/guide-profile";
import { mockGuides } from "@/lib/mock-guides";
import { notFound } from "next/navigation";

export default function GuidePage({ params }: { params: { id: string, lang: string } }) {
  const guide = mockGuides.find((g) => g.id === params.id);

  if (!guide) {
    notFound();
  }

  return (
     <div className="pb-24">
        <GuideProfile guide={guide} lang={params.lang} />
    </div>
  );
}

// Optional: Generate static pages for each guide for better performance
export async function generateStaticParams() {
    const locales = ['en', 'he', 'ar']; // Add other locales as needed
    const paths = mockGuides.flatMap(guide => 
        locales.map(lang => ({ id: guide.id, lang }))
    );
    return paths;
}

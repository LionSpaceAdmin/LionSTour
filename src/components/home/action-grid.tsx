import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, DraftingCompass, CalendarCheck, Users } from 'lucide-react';

export function ActionGrid({ dict, lang }: { dict: any, lang: string }) {

  const actions = [
    {
      href: `/${lang}/experiences`,
      label: dict.actions.explore,
      icon: Compass,
      description: dict.actions.description_explore,
    },
    {
      href: `/${lang}/plan`,
      label: dict.actions.plan,
      icon: DraftingCompass,
      description: dict.actions.description_plan,
    },
    {
      href: `/${lang}/book`,
      label: dict.actions.book,
      icon: CalendarCheck,
      description: dict.actions.description_book,
    },
    {
      href: `/${lang}/guides`,
      label: dict.actions.guides,
      icon: Users,
      description: dict.actions.description_guides,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action) => (
          <Link href={action.href} key={action.label}>
            <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 ease-in-out group bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <action.icon className="h-16 w-16 mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-headline font-semibold text-foreground">{action.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

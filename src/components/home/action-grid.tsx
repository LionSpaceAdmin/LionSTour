import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, DraftingCompass, CalendarCheck, Users } from 'lucide-react';

const actions = [
  {
    href: '/experiences',
    label: 'Explore',
    icon: Compass,
    description: 'Find your next adventure',
  },
  {
    href: '/plan',
    label: 'Plan',
    icon: DraftingCompass,
    description: 'Build your custom trip',
  },
  {
    href: '/book',
    label: 'Book',
    icon: CalendarCheck,
    description: 'Secure your journey',
  },
  {
    href: '/guides',
    label: 'Guides',
    icon: Users,
    description: 'Meet our veteran guides',
  },
];

export function ActionGrid() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action) => (
          <Link href={action.href} key={action.label}>
            <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out group bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <action.icon className="h-12 w-12 mb-4 text-primary group-hover:scale-110 transition-transform" />
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

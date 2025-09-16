import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, HeartHandshake, FileLock2 } from 'lucide-react';

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'Verified Veterans',
    description: 'Every guide is a vetted member of our community.',
  },
  {
    icon: HeartHandshake,
    title: '24/7 Safety',
    description: 'Your well-being is our top priority, around the clock.',
  },
  {
    icon: FileLock2,
    title: 'Insurance Coverage',
    description: 'Travel with peace of mind, knowing you are covered.',
  },
];

export function TrustStrip() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trustPoints.map((point) => (
          <Card key={point.title} className="bg-transparent border-0 md:border shadow-none md:shadow-sm">
            <CardContent className="flex flex-col md:flex-row items-center gap-4 p-6">
              <point.icon className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-headline font-semibold text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

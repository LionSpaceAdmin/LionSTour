import { TripPlanner } from '@/components/plan/trip-planner';

export default function PlanPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-headline font-bold text-center">Plan Your Custom Journey</h1>
        <p className="mt-4 text-lg text-muted-foreground text-center">
          Use our AI Concierge to build a personalized itinerary based on your dreams and desires.
        </p>
        <div className="mt-12">
          <TripPlanner />
        </div>
      </div>
    </div>
  );
}

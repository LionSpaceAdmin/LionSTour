'use client';

import type { Itinerary } from '@/ai/flows/concierge-service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, UserCheck, Sparkles } from 'lucide-react';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Your Custom Itinerary</CardTitle>
        {itinerary.guide && (
          <div className="flex items-center gap-2 text-muted-foreground pt-2">
            <UserCheck className="w-5 h-5 text-primary"/>
            <span className="font-semibold">Your guide: {itinerary.guide.name}</span>
            {itinerary.guide.locked && <Badge>Locked</Badge>}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="day-0">
          {itinerary.days.map((day, dayIndex) => (
            <AccordionItem value={`day-${dayIndex}`} key={dayIndex}>
              <AccordionTrigger className="text-xl font-headline">
                Day {dayIndex + 1}: {day.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 pl-4 border-l-2 border-primary/50 ml-2">
                  {day.stops.map((stop, stopIndex) => (
                    <div key={stop.id} className="relative">
                       <div className="absolute -left-[2.1rem] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-background" />
                      <p className="font-semibold text-lg">{stop.time} - {stop.title}</p>
                      <p className="text-muted-foreground text-sm">{stop.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{stop.duration} mins</span>
                        </div>
                        {stop.cost && (
                           <div className="flex items-center gap-1.5">
                            <DollarSign className="w-3 h-3" />
                            <span>~${stop.cost}</span>
                          </div>
                        )}
                         <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-yellow-500" />
                          <span>{stop.explainabilityTag}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-end bg-muted/50 p-4 rounded-b-lg">
          <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Estimated Cost</p>
              <p className="text-2xl font-bold text-primary">${itinerary.totalCost}</p>
          </div>
      </CardFooter>
    </Card>
  );
}

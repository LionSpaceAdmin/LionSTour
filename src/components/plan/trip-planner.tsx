'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { planTripAction } from '@/app/plan/actions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { PlanTripOutput } from '@/ai/flows/concierge-service';

const formSchema = z.object({
  travelerCount: z.number().min(1, 'At least one traveler is required.'),
  interests: z.string().min(3, 'Please list at least one interest.'),
  duration: z.number().min(1, 'Trip must be at least 1 day long.'),
  pace: z.enum(['relaxed', 'moderate', 'intensive']),
  budget: z.array(z.number()).length(2),
});

type FormValues = z.infer<typeof formSchema>;

export function TripPlanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<PlanTripOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelerCount: 1,
      interests: '',
      duration: 3,
      pace: 'moderate',
      budget: [500, 2000],
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setItinerary(null);
    try {
      const result = await planTripAction({
        intent: {
          travelers: {
            count: values.travelerCount,
            ages: [30], // Mock age for now
            interests: values.interests.split(',').map((i) => i.trim()),
          },
          temporal: {
            duration: values.duration,
            flexibility: 'flexible',
          },
          experiential: {
            themes: ['discovery'], // Mock theme
            pace: values.pace,
          },
          practical: {
            budget: {
              range: values.budget,
              currency: 'USD',
            },
          },
        },
      });

      if (result) {
        setItinerary(result);
        toast({
          title: "Itinerary Generated!",
          description: "Your personalized trip plan is ready below.",
        });
      } else {
        throw new Error('The AI service returned an empty response.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Itinerary',
        description: 'There was a problem creating your trip plan. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Trip Details</CardTitle>
        <CardDescription>Fill in your preferences and let our AI craft your journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="travelerCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Travelers</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Duration (days)</FormLabel>
                    <FormControl>
                       <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., History, Nature, Food, Adventure, Art"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separate interests with a comma.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trip Pace</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a pace" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="relaxed">Relaxed</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="intensive">Intensive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range (USD)</FormLabel>
                    <div className="flex items-center gap-4">
                      <span>${field.value[0]}</span>
                      <Slider
                        min={100}
                        max={10000}
                        step={100}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                      <span>${field.value[1]}</span>
                    </div>
                  <FormDescription>
                    Estimate your budget per person for the entire trip.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Building Your Journey...
                </>
              ) : (
                'Generate Itinerary'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

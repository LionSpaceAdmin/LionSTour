'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { planTripAction } from '@/app/plan/actions';
import type { Itinerary } from '@/ai/flows/concierge-service';

import { StepWho } from './steps/step-who';
import { StepWhen } from './steps/step-when';
import { StepWhat } from './steps/step-what';
import { StepBudget } from './steps/step-budget';
import { ItineraryDisplay } from './itinerary-display';
import { Loader2 } from 'lucide-react';

const whoSchema = z.object({
  travelerCount: z.number().min(1),
  interests: z.array(z.string()).min(1, 'Please select at least one interest.'),
});

const whenSchema = z.object({
  duration: z.number().min(1).max(30),
  season: z.string().optional(),
  flexibility: z.enum(['strict', 'flexible']),
});

const whatSchema = z.object({
  themes: z.array(z.string()).min(1, 'Please select at least one theme.'),
  pace: z.enum(['relaxed', 'moderate', 'intensive']),
});

const budgetSchema = z.object({
  budget: z.array(z.number()).length(2),
});

const tripPlannerSchema = whoSchema.merge(whenSchema).merge(whatSchema).merge(budgetSchema);
export type TripPlannerValues = z.infer<typeof tripPlannerSchema>;

const steps = [
  { id: 'who', title: 'Who is traveling?', schema: whoSchema, component: StepWho },
  { id: 'when', title: 'When are you going?', schema: whenSchema, component: StepWhen },
  { id: 'what', title: 'What is your style?', schema: whatSchema, component: StepWhat },
  { id: 'budget', title: 'What is your budget?', schema: budgetSchema, component: StepBudget },
];

export function TripPlanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const { toast } = useToast();

  const methods = useForm<TripPlannerValues>({
    resolver: zodResolver(steps[currentStep].schema),
    mode: 'onChange',
    defaultValues: {
      travelerCount: 1,
      interests: [],
      duration: 7,
      flexibility: 'flexible',
      themes: [],
      pace: 'moderate',
      budget: [1000, 3000],
    },
  });
  const { trigger, getValues, formState } = methods;

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await onSubmit(getValues());
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function onSubmit(values: TripPlannerValues) {
    setIsLoading(true);
    setItinerary(null);
    try {
      const result = await planTripAction({
        intent: {
          travelers: {
            count: values.travelerCount,
            ages: [30], // Mock age for now
            interests: values.interests,
          },
          temporal: {
            duration: values.duration,
            season: values.season,
            flexibility: values.flexibility,
          },
          experiential: {
            themes: values.themes,
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

      if (result?.itinerary) {
        setItinerary(result.itinerary);
        toast({
          title: "Itinerary Generated!",
          description: "Your personalized trip plan is ready below.",
        });
      } else {
        throw new Error('The AI service returned an empty or invalid response.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Itinerary',
        description: error.message || 'There was a problem creating your trip plan. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const CurrentStepComponent = steps[currentStep].component;

  if (isLoading) {
    return (
      <div className="text-center p-12">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <h2 className="mt-4 text-2xl font-headline font-semibold">Building Your Journey...</h2>
        <p className="mt-2 text-muted-foreground">Our AI is crafting the perfect trip for you.</p>
      </div>
    );
  }

  if (itinerary) {
    return (
      <div>
        <ItineraryDisplay itinerary={itinerary} />
        <div className="mt-8 text-center">
          <Button
            onClick={() => {
              setItinerary(null);
              setCurrentStep(0);
              methods.reset();
            }}
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <Progress value={((currentStep + 1) / steps.length) * 100} className="w-full" />
        <h2 className="text-2xl font-headline font-semibold text-center">{steps[currentStep].title}</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center pt-4">
          <div>
            {currentStep > 0 && (
              <Button variant="ghost" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div>
            <Button onClick={handleNext} disabled={!formState.isValid}>
              {currentStep === steps.length - 1 ? 'Generate Itinerary' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

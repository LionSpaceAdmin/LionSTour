'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { TripPlannerValues } from '../trip-planner';

export function StepBudget() {
  const { control, watch } = useFormContext<TripPlannerValues>();
  const budget = watch('budget');

  return (
    <div className="space-y-10 max-w-lg mx-auto pt-8">
       <FormField
        control={control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What is your approximate budget per person (USD)?</FormLabel>
              <div className="flex items-center gap-4 pt-4">
                <span className="text-sm text-muted-foreground w-24 text-center">${field.value[0]}</span>
                <Slider
                  min={500}
                  max={10000}
                  step={100}
                  value={field.value}
                  onValueChange={field.onChange}
                />
                <span className="text-sm text-muted-foreground w-24 text-center">${field.value[1]}</span>
              </div>
              <div className="text-center font-bold text-primary text-2xl pt-2">
                ${budget[0]} - ${budget[1]}
              </div>
            <FormDescription className="text-center">
              This helps us recommend appropriate lodging, dining, and activities.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

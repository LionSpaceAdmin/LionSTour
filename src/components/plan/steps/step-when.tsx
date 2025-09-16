'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TripPlannerValues } from '../trip-planner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEASONS } from '@/lib/constants';

export function StepWhen() {
  const { control, watch } = useFormContext<TripPlannerValues>();
  const duration = watch('duration');

  return (
    <div className="space-y-10 max-w-lg mx-auto">
      <FormField
        control={control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How long is your trip?</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Slider
                  min={1}
                  max={30}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
                <span className="font-bold text-primary text-lg w-16 text-center">{duration} days</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="season"
        render={({ field }) => (
          <FormItem>
            <FormLabel>When are you planning to go?</FormLabel>
             <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a season (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEASONS.map(season => (
                     <SelectItem key={season} value={season}>{season}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="flexibility"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>How flexible are your dates?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="strict" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Strict - The dates are fixed
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="flexible" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Flexible - I can move a few days
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

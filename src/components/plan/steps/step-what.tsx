'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { THEMES } from '@/lib/constants';
import { TripPlannerValues } from '../trip-planner';
import { Stethoscope, Telescope, Handshake, Mountain } from 'lucide-react';

const themeIcons = {
    'Healing': Stethoscope,
    'Discovery': Telescope,
    'Connection': Handshake,
    'Adventure': Mountain,
} as const;

export function StepWhat() {
  const { control } = useFormContext<TripPlannerValues>();

  return (
    <div className="space-y-10 max-w-lg mx-auto">
       <FormField
        control={control}
        name="themes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What is the main theme of your trip?</FormLabel>
            <FormMessage className="text-xs font-normal" />
            <FormControl>
               <ToggleGroup
                type="multiple"
                variant="outline"
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {THEMES.map((theme) => {
                    const Icon = themeIcons[theme as keyof typeof themeIcons];
                    return (
                        <ToggleGroupItem
                        key={theme}
                        value={theme}
                        className="h-20 flex-col gap-2"
                        >
                           {Icon && <Icon className="w-6 h-6" />}
                           {theme}
                        </ToggleGroupItem>
                    );
                })}
              </ToggleGroup>
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="pace"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>What pace do you prefer?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="relaxed" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Relaxed - Take it easy with plenty of downtime
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="moderate" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Moderate - A good balance of activities and free time
                  </FormLabel>
                </FormItem>
                 <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="intensive" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Intensive - Pack as much as possible into each day
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

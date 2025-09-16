'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { INTERESTS } from '@/lib/constants';
import { TripPlannerValues } from '../trip-planner';
import { cn } from '@/lib/utils';
import { HandHeart, Utensils, FerrisWheel, Trees, Landmark, Palette } from 'lucide-react';

const interestIcons = {
    'Connection': HandHeart,
    'Food': Utensils,
    'Adventure': FerrisWheel,
    'Nature': Trees,
    'History': Landmark,
    'Art': Palette
} as const;


export function StepWho() {
  const { control, watch, setValue } = useFormContext<TripPlannerValues>();
  const travelerCount = watch('travelerCount');

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <FormField
        control={control}
        name="travelerCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How many people are traveling?</FormLabel>
            <FormControl>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => setValue('travelerCount', Math.max(1, travelerCount - 1))}>-</Button>
                    <Input className="w-20 text-center text-lg" {...field} readOnly />
                    <Button variant="outline" size="icon" onClick={() => setValue('travelerCount', travelerCount + 1)}>+</Button>
                </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="interests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What are your interests?</FormLabel>
             <FormMessage className="text-xs font-normal" />
            <FormControl>
              <ToggleGroup
                type="multiple"
                variant="outline"
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                {INTERESTS.map((interest) => {
                  const Icon = interestIcons[interest as keyof typeof interestIcons];
                  return (
                    <ToggleGroupItem
                      key={interest}
                      value={interest}
                      className="h-20 flex-col gap-2 text-sm"
                    >
                        {Icon && <Icon className="w-6 h-6" />}
                      {interest}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

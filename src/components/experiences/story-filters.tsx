'use client';

import { THEMES } from '@/lib/constants';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

export function StoryFilters() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <ToggleGroup
        type="multiple"
        variant="outline"
        className="justify-start"
      >
        {THEMES.map(theme => (
          <ToggleGroupItem key={theme} value={theme} className="capitalize">
            {theme}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Button variant="outline" className="ml-auto">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        More Filters
      </Button>
    </div>
  );
}

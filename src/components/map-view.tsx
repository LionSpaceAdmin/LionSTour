"use client";

import { InteractiveMap } from "@/components/ui/interactive-map";

interface ExperienceForMap {
    id: string;
    title: string;
    latitude: number;
    longitude: number;
}

interface MapViewProps {
    experiences: ExperienceForMap[];
}

export function MapView({ experiences }: MapViewProps) {
  const markers = experiences.map(exp => ({
    latitude: exp.latitude,
    longitude: exp.longitude,
    title: exp.title,
  }));

  return (
    <div className="h-[600px] rounded-lg overflow-hidden border-2 border-purple-500/30">
      <InteractiveMap 
        initialLatitude={31.7683} 
        initialLongitude={35.2137} 
        initialZoom={7}
        markers={markers}
      />
    </div>
  );
}

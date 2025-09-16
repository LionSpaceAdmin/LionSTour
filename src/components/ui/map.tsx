'use client';

import { useEffect, useRef } from 'react';
import { mapboxgl, ISRAEL_CENTER, MAP_STYLES } from '@/lib/mapbox';

interface MapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  height?: string;
  className?: string;
}

export function Map({ 
  latitude = ISRAEL_CENTER.lat, 
  longitude = ISRAEL_CENTER.lng, 
  zoom = ISRAEL_CENTER.zoom,
  height = '400px',
  className = ''
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Only initialize map if Mapbox token is available
    if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
      console.warn('Mapbox access token not found');
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLES.streets,
      center: [longitude, latitude],
      zoom: zoom
    });

    // Add marker if specific coordinates are provided
    if (latitude !== ISRAEL_CENTER.lat || longitude !== ISRAEL_CENTER.lng) {
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [latitude, longitude, zoom]);

  // Fallback when no Mapbox token
  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <p className="text-gray-500">Map unavailable - Mapbox token required</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainer} 
      className={`w-full ${className}`}
      style={{ height }}
    />
  );
}
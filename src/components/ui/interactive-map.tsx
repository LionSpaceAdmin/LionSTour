"use client";

import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export function InteractiveMap({ latitude, longitude, zoom = 10 }: InteractiveMapProps) {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom,
  });

  return (
    <Map
      {...viewport}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onMove={(evt) => setViewport(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker longitude={longitude} latitude={latitude} />
    </Map>
  );
}

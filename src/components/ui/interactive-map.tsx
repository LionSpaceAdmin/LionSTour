"use client";

import { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MarkerData {
  latitude: number;
  longitude: number;
  title: string;
}

interface InteractiveMapProps {
  initialLatitude: number;
  initialLongitude: number;
  initialZoom?: number;
  markers?: MarkerData[];
}

export function InteractiveMap({ 
  initialLatitude, 
  initialLongitude, 
  initialZoom = 7, 
  markers = [] 
}: InteractiveMapProps) {
  const [viewport, setViewport] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: initialZoom,
  });
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

  return (
    <Map
      {...viewport}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onMove={(evt) => setViewport(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/dark-v11" // Using a dark theme to match the site
    >
      {markers.map((marker, index) => (
        <Marker key={index} longitude={marker.longitude} latitude={marker.latitude}>
          <button onClick={(e) => {
            e.preventDefault();
            setSelectedMarker(marker);
          }} className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-lg" />
        </Marker>
      ))}

      {selectedMarker && (
        <Popup
          longitude={selectedMarker.longitude}
          latitude={selectedMarker.latitude}
          onClose={() => setSelectedMarker(null)}
          closeOnClick={false}
          anchor="top"
        >
          <div className="p-2 bg-gray-800 text-white rounded-lg">
            <h3 className="font-bold">{selectedMarker.title}</h3>
          </div>
        </Popup>
      )}
    </Map>
  );
}

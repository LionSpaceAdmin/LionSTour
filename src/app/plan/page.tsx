
"use client";

import { useState } from "react";
import { itineraryGenerator2 } from "@/ai/flows/itineraryGenerator";

export default function PlanPage() {
  const [request, setRequest] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await itineraryGenerator2({ request });
      setItinerary(result);
    } catch (error) {
      console.error("Error generating itinerary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-headline font-bold text-center">
          Plan Your Custom Journey
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-center">
          Use our AI Concierge to build a personalized itinerary based on your
          dreams and desires.
        </p>
        <div className="mt-12">
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full p-4 border rounded-md"
              placeholder="Tell us about your dream trip..."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              rows={4}
            />
            <button
              className="bg-blue-500 text-white p-4 rounded-md"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Itinerary"}
            </button>
          </div>
          {itinerary && (
            <div className="mt-8">
              <pre>{JSON.stringify(itinerary, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

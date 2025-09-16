'use client';

import { useState } from 'react';
import { runFlow } from '@genkit-ai/flow';
import { tripPlannerFlow } from '../../../ai/trip-planner';

export default function TripPlannerPage() {
  const [prompt, setPrompt] = useState('');
  const [checklist, setChecklist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setChecklist([]);
    setError(null);

    try {
      const result = await runFlow(tripPlannerFlow, { prompt });
      setChecklist(result);
    } catch (err) {
      console.error(err);
      setError('Sorry, something went wrong. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div dir="ltr" style={{ padding: '2rem' }}>
      <h1>Trip Planner</h1>
      <p>Tell me about your trip, and I'll generate a checklist for you.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A 5-day ski trip to the Alps"
          style={{ width: '300px', padding: '0.5rem' }}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} style={{ marginLeft: '0.5rem' }}>
          {isLoading ? 'Generating...' : 'Generate Checklist'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {checklist.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Your Checklist:</h2>
          <ul>
            {checklist.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// src/ai/flows/concierge-service.ts
'use server';
/**
 * @fileOverview An AI concierge service for planning trips.
 *
 * - planTrip - A function that handles the trip planning process.
 * - PlanTripInput - The input type for the planTrip function.
 * - PlanTripOutput - The return type for the planTrip function.
 */

import {ai} from '@/ai/genkit';
import {findRelevantGuides} from '@/ai/tools/guide-finder';
import {z} from 'genkit';

const PlanningIntentSchema = z.object({
  travelers: z.object({
    count: z.number().describe('The number of travelers.'),
    ages: z.array(z.number()).describe('The ages of the travelers.'),
    interests: z.array(z.string()).describe('The interests of the travelers.'),
  }).describe('Information about the travelers.'),
  temporal: z.object({
    duration: z.number().describe('The duration of the trip in days.'),
    season: z.string().optional().describe('The season of the trip.'),
    flexibility: z.enum(['strict', 'flexible']).describe('How flexible the dates are.'),
  }).describe('Temporal information about the trip.'),
  experiential: z.object({
    themes: z.array(z.string()).describe('The themes of the trip (e.g., healing, discovery).'),
    pace: z.enum(['relaxed', 'moderate', 'intensive']).describe('The pace of the trip.'),
  }).describe('Experiential information about the trip.'),
  practical: z.object({
    budget: z.object({
      range: z.array(z.number()).length(2).describe('The budget range for the trip.'),
      currency: z.string().describe('The currency of the budget.'),
    }).describe('The budget for the trip.'),
  }).describe('Practical information about the trip.'),
});
export type PlanningIntent = z.infer<typeof PlanningIntentSchema>;

const ItinerarySchema = z.object({
  days: z.array(z.object({
    date: z.string().describe('The date of the day.'),
    title: z.string().describe('The title of the day.'),
    stops: z.array(z.object({
      id: z.string().describe('The ID of the stop.'),
      time: z.string().describe('The time of the stop.'),
      title: z.string().describe('The title of the stop.'),
      description: z.string().describe('A short description of the stop.'),
      explainabilityTag: z.string().describe('An explainability tag for the stop.'),
      guide: z.string().optional().describe('The guide for the stop.'),
      location: z.object({
        lat: z.number(),
        lng: z.number(),
      }).describe('The location of the stop.'),
      duration: z.number().describe('The duration of the stop in minutes.'),
      cost: z.number().optional().describe('The cost of the stop.'),
    })).describe('The stops for the day.'),
  })).describe('The days of the itinerary.'),
  guide: z.object({
    id: z.string().describe('The ID of the guide.'),
    name: z.string().describe('The name of the guide.'),
    locked: z.boolean().describe('Whether the guide is locked.'),
  }).optional().describe('The guide for the itinerary.'),
  totalCost: z.number().describe('The total cost of the itinerary.'),
});
export type Itinerary = z.infer<typeof ItinerarySchema>;

const PlanTripInputSchema = z.object({
  intent: PlanningIntentSchema.describe('The intent of the trip.'),
});
export type PlanTripInput = z.infer<typeof PlanTripInputSchema>;

const PlanTripOutputSchema = z.object({
  itinerary: ItinerarySchema.describe('The generated itinerary.'),
  summary: z.string().describe('A summary of the trip.'),
});
export type PlanTripOutput = z.infer<typeof PlanTripOutputSchema>;

export async function planTrip(input: PlanTripInput): Promise<PlanTripOutput> {
  return planTripFlow(input);
}

const prompt = ai.definePrompt({
  name: 'planTripPrompt',
  input: {
    schema: PlanTripInputSchema,
  },
  output: {
    schema: PlanTripOutputSchema,
  },
  tools: [findRelevantGuides],
  prompt: `You are a trip planning expert specializing in Israel tourism. Generate a trip itinerary based on the following intent:

Traveler Information: Number of travelers: {{{intent.travelers.count}}}, Ages: {{{intent.travelers.ages}}}, Interests: {{{intent.travelers.interests}}}
Temporal Information: Duration: {{{intent.temporal.duration}}} days, Season: {{{intent.temporal.season}}}, Flexibility: {{{intent.temporal.flexibility}}}
Experiential Information: Themes: {{{intent.experiential.themes}}}, Pace: {{{intent.experiential.pace}}}
Practical Information: Budget Range: {{{intent.practical.budget.range}}}, Currency: {{{intent.practical.budget.currency}}}

If the user's interests mention a specific type of guide (e.g., 'desert expert', 'storyteller'), use the findRelevantGuides tool to get information about available guides that match those criteria. If you use the tool and find a good match, assign that guide to the itinerary.

Create a detailed itinerary with daily stops, descriptions, explainability tags, and location data. Provide a summary of the trip and its total cost. Use your knowledge of Israel to make the itinerary wonderful and accurate. Try to choose highly-rated locations with strong reviews and a history of positive feedback.

Format your response as a JSON object matching the PlanTripOutputSchema.`,
});

const planTripFlow = ai.defineFlow(
  {
    name: 'planTripFlow',
    inputSchema: PlanTripInputSchema,
    outputSchema: PlanTripOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

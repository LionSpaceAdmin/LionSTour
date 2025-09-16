'use server';
/**
 * @fileOverview A tool for finding relevant tour guides based on criteria.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GuideFinderInputSchema = z.object({
  query: z.string().describe('A query describing the desired guide, e.g., "desert expert" or "someone who knows about culinary history".'),
});

const GuideSchema = z.object({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    specialties: z.array(z.string()),
});

const GuideFinderOutputSchema = z.object({
  guides: z.array(GuideSchema).describe('A list of guides matching the query.'),
});

export const findRelevantGuides = ai.defineTool(
  {
    name: 'findRelevantGuides',
    description: 'Finds relevant tour guides from the database based on a query.',
    inputSchema: GuideFinderInputSchema,
    outputSchema: GuideFinderOutputSchema,
  },
  async (input) => {
    console.log(`[findRelevantGuides] Received query: ${input.query}`);

    // In a real application, this would query a Firestore database.
    // For now, we'll return mock data to demonstrate the RAG pattern.
    const mockGuides = [
        { id: '1', name: 'Amir Cohen', title: 'Negev Desert Expert', specialties: ['desert', 'survival', 'spirituality'] },
        { id: '2', name: 'Tamar Levi', title: 'Jerusalem Storyteller', specialties: ['history', 'archeology', 'jerusalem'] },
        { id: '3', name: 'Yoni Goldstein', title: 'Galilee & Culinary Guide', specialties: ['food', 'foraging', 'galilee', 'culinary'] },
    ];

    const query = input.query.toLowerCase();
    const relevantGuides = mockGuides.filter(guide => 
        guide.title.toLowerCase().includes(query) ||
        guide.specialties.some(s => s.toLowerCase().includes(query))
    );

    console.log(`[findRelevantGuides] Found ${relevantGuides.length} relevant guides.`);
    return { guides: relevantGuides };
  }
);

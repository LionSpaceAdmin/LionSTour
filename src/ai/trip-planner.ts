import { defineFlow, runFlow } from '@genkit-ai/flow';
import { geminiPro } from '@genkit-ai/googleai';
import { z } from 'zod';

// Define the input schema for the flow
const TripPromptSchema = z.object({
  prompt: z.string(),
});

// Define the flow that generates the checklist
export const tripPlannerFlow = defineFlow(
  {
    name: 'tripPlannerFlow',
    inputSchema: TripPromptSchema,
    outputSchema: z.array(z.string()), // An array of strings
  },
  async ({ prompt }) => {
    const llmResponse = await geminiPro.generate({
      prompt: `Generate a concise travel checklist based on the following trip description. Return only a simple, comma-separated list of items. Description: ${prompt}`,
    });

    const checklistText = llmResponse.text();
    const checklist = checklistText.split(',').map(item => item.trim());

    return checklist;
  }
);

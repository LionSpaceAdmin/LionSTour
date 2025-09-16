// src/ai/flows/image-generator.ts
'use server';
/**
 * @fileOverview An AI service for generating images based on predefined prompts.
 *
 * - generateImage - A function that handles the image generation process.
 */

import { ai } from '@/ai/genkit';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  id: z.string().describe('The unique identifier for the image prompt.'),
});
type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe('The base64 data URI of the generated image.'),
});
type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async ({ id }) => {
    const imageConfig = PlaceHolderImages.find((p) => p.id === id);

    if (!imageConfig || !imageConfig.prompt) {
      throw new Error(`Image prompt not found for id: ${id}`);
    }

    console.log(`[generateImageFlow] Generating image for: ${id}`);

    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: imageConfig.prompt,
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a URL.');
    }

    console.log(`[generateImageFlow] Successfully generated image for: ${id}`);

    return {
      imageUrl: media.url,
    };
  }
);

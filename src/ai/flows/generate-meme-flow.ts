'use server';
/**
 * @fileOverview An AI-powered meme generator.
 *
 * - generateMeme - A function that handles the meme generation process.
 * - GenerateMemeInput - The input type for the generateMeme function.
 * - GenerateMemeOutput - The return type for the generateMeme function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const GenerateMemeInputSchema = z.object({
  prompt: z.string().describe('A descriptive prompt for the meme to be generated.'),
});
export type GenerateMemeInput = z.infer<typeof GenerateMemeInputSchema>;

const GenerateMemeOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated meme image.'),
  promptUsed: z.string().describe('The full prompt that was used to generate the image.'),
});
export type GenerateMemeOutput = z.infer<typeof GenerateMemeOutputSchema>;

export async function generateMeme(input: GenerateMemeInput): Promise<GenerateMemeOutput> {
  return generateMemeFlow(input);
}

const generateMemeFlow = ai.defineFlow(
  {
    name: 'generateMemeFlow',
    inputSchema: GenerateMemeInputSchema,
    outputSchema: GenerateMemeOutputSchema,
  },
  async (input) => {
    const memeId = uuidv4();
    const fullPrompt = `Create a top-notch, high-quality meme about "${input.prompt}". The meme must have clear, legible text and a modern, visually appealing design. The humor should be witty and relevant to internet culture.`;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: fullPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
        throw new Error("Image generation failed or returned no URL.");
    }
    
    return {
      imageUrl: media.url,
      promptUsed: fullPrompt,
    };
  }
);

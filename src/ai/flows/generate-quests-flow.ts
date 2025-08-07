'use server';
/**
 * @fileOverview A quest generation AI agent.
 *
 * - generateQuests - A function that handles the quest generation process.
 * - Quest - The type for a single quest.
 * - GenerateQuestsOutput - The return type for the generateQuests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const QuestSchema = z.object({
  title: z.string().describe('The title of the quest.'),
  description: z.string().describe('The description of the quest.'),
  reward: z.string().describe('The XP reward for completing the quest, formatted as "XXX XP".'),
  icon: z.enum(["Twitter", "Users", "Star", "Gem", "MessageSquareQuote", "WandSparkles"]).describe("The icon for the quest. Choose one from the list."),
});
export type Quest = z.infer<typeof QuestSchema>;

const GenerateQuestsOutputSchema = z.object({
  quests: z.array(QuestSchema).length(5),
});
export type GenerateQuestsOutput = z.infer<typeof GenerateQuestsOutputSchema>;

export async function generateQuests(): Promise<GenerateQuestsOutput> {
  return generateQuestsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateQuestsPrompt',
  output: {schema: GenerateQuestsOutputSchema},
  prompt: `You are a game designer for a meme token project called Neura AI.

Generate a list of 5 creative and engaging quests for the user to complete.
The quests should be related to social media engagement, community participation, and using the platform's features, including the new AI Meme Generator.

Keep the tone lighthearted and witty, in line with the AI and meme theme. Ensure the quests are simple to understand and the rewards are appropriate.
The available icons are: "Twitter", "Users", "Star", "Gem", "MessageSquareQuote", "WandSparkles".

One of the quests MUST be to use the AI Meme Generator, and its icon MUST be "WandSparkles".
`,
});

const generateQuestsFlow = ai.defineFlow(
  {
    name: 'generateQuestsFlow',
    outputSchema: GenerateQuestsOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);

'use server';
/**
 * @fileOverview A flow for claiming quest rewards.
 *
 * - claimQuest - A function that handles the logic for claiming a quest reward.
 * - ClaimQuestInput - The input type for the claimQuest function.
 * - ClaimQuestOutput - The return type for the claimQuest function.
 */

import { ai } from '@/ai/genkit';
import { claimQuestReward, getUser } from '@/services/firestore';
import { z } from 'zod';
import type { Quest } from './generate-quests-flow';

const QuestSchema = z.object({
    title: z.string().describe('The title of the quest.'),
    description: z.string().describe('The description of the quest.'),
    reward: z.string().describe('The XP reward for completing the quest, formatted as "XXX XP".'),
    icon: z.enum(["Twitter", "Users", "Star", "Gem", "MessageSquareQuote", "WandSparkles"]).describe("The icon for the quest. Choose one from the list."),
});

export const ClaimQuestInputSchema = z.object({
  wallet: z.string().describe("The user's wallet address."),
  quest: QuestSchema,
});
export type ClaimQuestInput = z.infer<typeof ClaimQuestInputSchema>;

export const ClaimQuestOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  newXp: z.number().optional(),
});
export type ClaimQuestOutput = z.infer<typeof ClaimQuestOutputSchema>;

export async function claimQuest(input: ClaimQuestInput): Promise<ClaimQuestOutput> {
  return claimQuestFlow(input);
}

const claimQuestFlow = ai.defineFlow(
  {
    name: 'claimQuestFlow',
    inputSchema: ClaimQuestInputSchema,
    outputSchema: ClaimQuestOutputSchema,
  },
  async ({ wallet, quest }) => {
    try {
      const user = await getUser(wallet);
      if (user && user.completedQuests?.includes(quest.title)) {
        return {
          success: false,
          message: 'You have already completed this quest.',
        };
      }

      const xpToAward = parseInt(quest.reward.split(' ')[0], 10);
      if (isNaN(xpToAward)) {
          return { success: false, message: "Invalid XP reward format." };
      }

      const updatedUser = await claimQuestReward(wallet, quest.title, xpToAward);

      return {
        success: true,
        message: `Quest completed! You earned ${xpToAward} XP.`,
        newXp: updatedUser.xp,
      };
    } catch (error: any) {
        console.error("Error claiming quest:", error);
        return { success: false, message: error.message || "An unexpected error occurred." };
    }
  }
);
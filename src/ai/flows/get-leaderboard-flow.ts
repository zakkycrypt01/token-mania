'use server';
/**
 * @fileOverview A leaderboard data retrieval agent.
 *
 * - getLeaderboard - A function that fetches leaderboard data from Firestore.
 * - LeaderboardEntry - The type for a single leaderboard entry.
 */

import { ai } from '@/ai/genkit';
import { getLeaderboard, LeaderboardEntry } from '@/services/firestore';
import { z } from 'zod';

const LeaderboardEntrySchema = z.object({
  rank: z.number(),
  user: z.string(),
  contribution: z.number(),
  xp: z.number(),
});

const GetLeaderboardOutputSchema = z.object({
    leaderboard: z.array(LeaderboardEntrySchema),
});

export async function getLeaderboardFlow(): Promise<{ leaderboard: LeaderboardEntry[] }> {
    return getLeaderboardDataFlow();
}

const getLeaderboardDataFlow = ai.defineFlow(
  {
    name: 'getLeaderboardDataFlow',
    outputSchema: GetLeaderboardOutputSchema,
  },
  async () => {
    const leaderboard = await getLeaderboard();
    return { leaderboard };
  }
);

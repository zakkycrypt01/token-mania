'use server';

import { firestore } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export interface LeaderboardEntry {
    rank: number;
    user: string;
    contribution: number;
    xp: number;
}

export async function addContribution(wallet: string, amount: number) {
    try {
        await addDoc(collection(firestore, 'contributions'), {
            wallet: wallet,
            amount: amount,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding contribution to Firestore: ", error);
        throw new Error("Could not record contribution.");
    }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'contributions'));
        const contributions = new Map<string, number>();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const { wallet, amount } = data;
            contributions.set(wallet, (contributions.get(wallet) || 0) + amount);
        });

        const sortedContributions = Array.from(contributions.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        // Simple XP calculation: 1 SOL = 1000 XP
        const leaderboard = sortedContributions.map(([user, contribution], index) => ({
            rank: index + 1,
            user: `${user.slice(0, 4)}...${user.slice(-4)}`,
            contribution: contribution,
            xp: Math.floor(contribution * 1000),
        }));

        return leaderboard;
    } catch (error) {
        console.error("Error fetching leaderboard from Firestore: ", error);
        return []; // Return empty on error
    }
}

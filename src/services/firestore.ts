'use server';

import { firestore } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from 'firebase/firestore';

export interface User {
    wallet: string;
    xp: number;
    completedQuests: string[];
}

export interface LeaderboardEntry {
    rank: number;
    user: string;
    contribution: number;
    xp: number;
}

export async function getUser(wallet: string): Promise<User | null> {
    const userRef = doc(firestore, 'users', wallet);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data() as User;
    }
    return null;
}

export async function createUser(wallet: string): Promise<User> {
    const newUser: User = {
        wallet,
        xp: 0,
        completedQuests: [],
    };
    await setDoc(doc(firestore, 'users', wallet), newUser);
    return newUser;
}

export async function addContribution(wallet: string, amount: number) {
    try {
        const userRef = doc(firestore, 'users', wallet);
        const userSnap = await getDoc(userRef);

        const contributionXp = Math.floor(amount * 1000);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                wallet: wallet,
                xp: contributionXp,
                contribution: amount,
                completedQuests: [],
            });
        } else {
            await updateDoc(userRef, {
                contribution: increment(amount),
                xp: increment(contributionXp),
            });
        }
        
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

export async function claimQuestReward(wallet: string, questTitle: string, xp: number): Promise<User> {
    const userRef = doc(firestore, 'users', wallet);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            wallet: wallet,
            xp: xp,
            contribution: 0,
            completedQuests: [questTitle],
        });
    } else {
        await updateDoc(userRef, {
            xp: increment(xp),
            completedQuests: arrayUnion(questTitle),
        });
    }

    const updatedUserSnap = await getDoc(userRef);
    return updatedUserSnap.data() as User;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const users: LeaderboardEntry[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            users.push({
                rank: 0, // will be set after sorting
                user: `${data.wallet.slice(0, 4)}...${data.wallet.slice(-4)}`,
                contribution: data.contribution || 0,
                xp: data.xp || 0,
            });
        });
        
        const sortedUsers = users.sort((a, b) => b.xp - a.xp).slice(0, 5);
        
        return sortedUsers.map((user, index) => ({
            ...user,
            rank: index + 1,
        }));

    } catch (error) {
        console.error("Error fetching leaderboard from Firestore: ", error);
        return []; // Return empty on error
    }
}

// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Award, ShieldCheck, Users, Rocket, Gem, Star, MessageSquareQuote, Twitter, WandSparkles, ArrowRight } from "lucide-react";
import { generateQuests, Quest } from '@/ai/flows/generate-quests-flow';
import { getLeaderboardFlow } from '@/ai/flows/get-leaderboard-flow';
import { LeaderboardEntry } from '@/services/firestore';
import { Skeleton } from '../ui/skeleton';

type QuestWithStatus = Quest & { completed: boolean; action: () => void; cta: string };

export default function GamificationSection() {
  const [quests, setQuests] = useState<QuestWithStatus[]>([]);
  const [loadingQuests, setLoadingQuests] = useState(true);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  const handleQuestAction = (questToComplete: QuestWithStatus) => {
    questToComplete.action();
    setQuests(quests.map(quest => 
      quest.title === questToComplete.title ? { ...quest, completed: true } : quest
    ));
  };
  
  const getQuestAction = (quest: Quest): { action: () => void; cta: string } => {
    const title = quest.title.toLowerCase();
    if (title.includes('meme')) {
      return { action: () => document.getElementById('meme-generator')?.scrollIntoView({ behavior: 'smooth' }), cta: 'Create Meme' };
    }
    if (title.includes('twitter')) {
      return { action: () => window.open('https://twitter.com', '_blank'), cta: 'Share on X' };
    }
    if (title.includes('telegram')) {
      return { action: () => window.open('https://telegram.org', '_blank'), cta: 'Join Telegram' };
    }
     if (title.includes('discord')) {
      return { action: () => window.open('https://discord.com', '_blank'), cta: 'Join Discord' };
    }
    if (title.includes('purchase') || title.includes('presale')) {
       return { action: () => document.getElementById('presale')?.scrollIntoView({ behavior: 'smooth' }), cta: 'Go to Presale' };
    }
    return { action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), cta: 'Learn More' };
  };


  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setLoadingQuests(true);
        const response = await generateQuests();
        const questsWithStatus = response.quests.map(quest => ({
            ...quest,
            completed: false,
            ...getQuestAction(quest)
        }));
        setQuests(questsWithStatus);
      } catch (error) {
        console.error("Failed to generate quests:", error);
        // Fallback to some default quests if generation fails
        const defaultQuests: Quest[] = [
          { title: "The Genesis Share", description: "Share the presale on X/Twitter.", reward: "100 XP", icon: "Twitter" },
          { title: "Community Explorer", description: "Join our Telegram and Discord.", reward: "150 XP", icon: "Users" },
          { title: "Meme Architect", description: "Create a meme with the AI Generator.", reward: "250 XP", icon: "WandSparkles" },
          { title: "First Contact", description: "Make your first presale purchase.", reward: "200 XP", icon: "Gem" },
          { title: "Lore Seeker", description: "Visit all info pages on the site.", reward: "50 XP", icon: "Star" },
        ];
        setQuests(defaultQuests.map(q => ({...q, completed: false, ...getQuestAction(q)})));
      } finally {
        setLoadingQuests(false);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        setLoadingLeaderboard(true);
        const response = await getLeaderboardFlow();
        setLeaderboard(response.leaderboard);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoadingLeaderboard(false);
      }
    };

    fetchQuests();
    fetchLeaderboard();
  }, []);

  const getQuestIcon = (iconName: string) => {
    switch(iconName) {
      case "Twitter": return <Twitter className="w-6 h-6" />;
      case "Users": return <Users className="w-6 h-6" />;
      case "Star": return <Star className="w-6 h-6" />;
      case "Gem": return <Gem className="w-6 h-6" />;
      case "MessageSquareQuote": return <MessageSquareQuote className="w-6 h-6" />;
      case "WandSparkles": return <WandSparkles className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  }

  const achievements = [
    { title: "First Buyer", icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />, tier: "Bronze" },
    { title: "Community Contributor", icon: <Users className="w-8 h-8 text-slate-400" />, tier: "Silver" },
    { title: "Meme Master", icon: <Rocket className="w-8 h-8 text-amber-400" />, tier: "Gold" },
    { title: "Solana Savant", icon: <Award className="w-8 h-8 text-yellow-500" />, tier: "Bronze" },
    { title: "Presale Pioneer", icon: <Gem className="w-8 h-8 text-slate-400" />, tier: "Silver" },
    { title: "Whale Watcher", icon: <WhaleIcon className="w-8 h-8 text-amber-400" />, tier: "Gold" },
  ];

  return (
    <div className="bg-background">
      <section id="quests" className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-400">
              Quest Log
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Complete missions to earn XP, climb the ranks, and unlock epic rewards.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingQuests ? (
              Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="flex flex-col bg-card/50 border-primary/10">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Skeleton className="h-6 w-[100px]" />
                     <Skeleton className="h-10 w-full mt-4" />
                  </CardContent>
                </Card>
              ))
            ) : (
              quests.map((quest, index) => (
                <Card key={index} className="flex flex-col bg-card/50 border-primary/10 hover:border-primary/30 transition-all">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/20">{getQuestIcon(quest.icon)}</div>
                    <div>
                      <CardTitle className="font-headline">{quest.title}</CardTitle>
                      <CardDescription>{quest.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto flex flex-col gap-4">
                    <Badge variant="secondary" className="w-fit">Reward: {quest.reward}</Badge>
                     <Button 
                        onClick={() => handleQuestAction(quest)} 
                        disabled={quest.completed}
                        variant={quest.completed ? "secondary" : "default"}
                        className="w-full"
                      >
                      {quest.completed ? 'Completed' : quest.cta}
                      {!quest.completed && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="leaderboard" className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-400">
              Hall of Memes
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              See who's leading the charge. Will you make it to the top?
            </p>
          </div>
          <Card className="bg-card/50 border-primary/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Contribution (SOL)</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingLeaderboard ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : leaderboard.length > 0 ? (
                  leaderboard.map((entry) => (
                    <TableRow key={entry.rank} className="hover:bg-primary/5">
                      <TableCell className="font-medium text-primary text-lg">{entry.rank}</TableCell>
                      <TableCell className="font-mono">{entry.user}</TableCell>
                      <TableCell>{entry.contribution.toFixed(4)}</TableCell>
                      <TableCell className="text-right">{entry.xp.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                            Be the first to contribute and claim your spot in the Hall of Memes!
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>

      <section id="achievements" className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-400">
              Trophy Room
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Unlock prestigious badges for your epic deeds and milestones.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="flex flex-col items-center justify-center p-6 text-center bg-card/50 border-primary/10 hover:border-primary/30 transition-all">
                <div className="mb-4">{achievement.icon}</div>
                <p className="font-semibold font-headline">{achievement.title}</p>
                <Badge variant={achievement.tier === 'Gold' ? 'default' : achievement.tier === 'Silver' ? 'secondary' : 'outline'} className={`mt-2 ${achievement.tier === 'Gold' ? 'bg-amber-400 text-black' : achievement.tier === 'Silver' ? 'bg-slate-400 text-black' : ''}`}>
                  {achievement.tier}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
}

function WhaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.6 2.5c-2.4 1.3-4.1 3.2-5.1 5.3-1.8 3.7-2.7 7.7-2.5 11.7.2 4.1 2.9 6.2 5.5 5.5 2.5-.7 3.5-3.8 3.5-7.1 0-2.5-.8-5-2.2-7.1-.6-1.1-1.3-2-2.1-2.8 2.3.2 4.3-.3 6-1.5 1.7-1.2 2.9-2.9 3.5-5-.2 0-.4 0-.6-.1-1.3-.3-2.5-.8-3.6-1.5z" />
      <path d="M6.1 8.2C6.1 8.2 5.4 9 4.2 9c-1.2 0-2.3-1.2-2.3-2.4S3 4.2 4.2 4.2c1.2 0 1.9.8 1.9.8" />
    </svg>
  )
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Award, ShieldCheck, Users, Rocket, Gem, Star, MessageSquareQuote } from "lucide-react";

export default function GamificationSection() {
  const quests = [
    { title: "The Genesis Share", description: "Share the presale on X/Twitter.", reward: "100 XP", icon: <TwitterIcon className="w-6 h-6" /> },
    { title: "Community Explorer", description: "Join our Telegram and Discord.", reward: "150 XP", icon: <Users className="w-6 h-6" /> },
    { title: "Lore Seeker", description: "Visit all info pages on the site.", reward: "50 XP", icon: <Star className="w-6 h-6" /> },
    { title: "First Contact", description: "Make your first presale purchase.", reward: "200 XP", icon: <Gem className="w-6 h-6" /> },
    { title: "Meme Architect", description: "Contribute a meme idea in Discord.", reward: "250 XP", icon: <MessageSquareQuote className="w-6 h-6" /> },
  ];

  const leaderboard = [
    { rank: 1, user: "0x12...aBcd", contribution: "10.5 SOL", xp: 12500 },
    { rank: 2, user: "0x34...eFgH", contribution: "9.8 SOL", xp: 11200 },
    { rank: 3, user: "0x56...iJkL", contribution: "8.2 SOL", xp: 9800 },
    { rank: 4, user: "0x78...mNoP", contribution: "7.1 SOL", xp: 8500 },
    { rank: 5, user: "0x90...qRsT", contribution: "6.5 SOL", xp: 7600 },
  ];

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
            {quests.map((quest, index) => (
              <Card key={index} className="flex flex-col bg-card/50 border-primary/10 hover:border-primary/30 transition-all">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/20">{quest.icon}</div>
                  <div>
                    <CardTitle className="font-headline">{quest.title}</CardTitle>
                    <CardDescription>{quest.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Badge variant="secondary">Reward: {quest.reward}</Badge>
                </CardContent>
              </Card>
            ))}
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
                  <TableHead>Contribution</TableHead>
                  <TableHead className="text-right">XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry) => (
                  <TableRow key={entry.rank} className="hover:bg-primary/5">
                    <TableCell className="font-medium text-primary text-lg">{entry.rank}</TableCell>
                    <TableCell className="font-mono">{entry.user}</TableCell>
                    <TableCell>{entry.contribution}</TableCell>
                    <TableCell className="text-right">{entry.xp.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
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

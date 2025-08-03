import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Gem, Target } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary tracking-tighter">
            Our Mission to the Moon
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Unlocking the legendary power of meme magic on the Solana blockchain. We're not just a token; we're a movement.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Meme Dog Astronaut"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg animate-pulse"
              data-ai-hint="dog astronaut"
            />
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary"><Rocket className="w-6 h-6" /></div>
                <CardTitle className="font-headline">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To build the most engaged and entertaining community in the crypto space, powered by gamification and top-tier memes. We're aiming for the stars, literally.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-3 rounded-full bg-primary/10 text-primary"><Gem className="w-6 h-6" /></div>
                <CardTitle className="font-headline">Unique Selling Points</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Deeply integrated gamification, real rewards for participation, and a community-driven approach to content and development. Your engagement directly fuels our growth.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-3 rounded-full bg-primary/10 text-primary"><Target className="w-6 h-6" /></div>
                <CardTitle className="font-headline">The Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To create a self-sustaining ecosystem where fun and finance collide. We're not just creating a token; we're creating an experience.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

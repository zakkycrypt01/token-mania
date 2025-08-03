import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Gem, Target } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-400">
            Our Mission for a Smarter Future
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Unlocking the power of decentralized AI on the Solana blockchain. We're not just a token; we're building the future of intelligence.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square">
            <Image
              src="https://placehold.co/600x600.png"
              alt="AI Brain"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg animate-pulse glow-shadow"
              data-ai-hint="AI brain"
            />
          </div>
          <div className="space-y-8">
            <Card className="bg-background/50 border-primary/10 transition-all hover:border-primary/30">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/20"><Rocket className="w-6 h-6" /></div>
                <CardTitle className="font-headline">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To build the most powerful and accessible decentralized AI network, powered by a community of innovators and builders.</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 border-primary/10 transition-all hover:border-primary/30">
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/20"><Gem className="w-6 h-6" /></div>
                <CardTitle className="font-headline">Unique Selling Points</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">A highly scalable and efficient AI model, a rewarding ecosystem for data contributors, and a community-driven approach to development.</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 border-primary/10 transition-all hover:border-primary/30">
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-3 rounded-full bg-primary/10 text-primary border border-primary/20"><Target className="w-6 h-6" /></div>
                <CardTitle className="font-headline">The Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To create a self-sustaining ecosystem where AI innovation and finance converge. We're building a new paradigm for intelligence.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

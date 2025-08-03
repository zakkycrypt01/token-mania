import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Meme Dog in space"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
          data-ai-hint="corgi dog space"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
      </div>
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 border border-primary/20 shadow-sm">
            <Sparkles className="inline-block w-4 h-4 mr-2" />
            The Ultimate Solana Meme Token is Here!
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-300">
            Welcome to <span className="text-primary">Meme Token Mania</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the most gamified presale event in crypto history. Complete quests, climb the leaderboard, and secure your bag of the next legendary meme token.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild className="glow-shadow">
              <Link href="#presale">
                Join Presale Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

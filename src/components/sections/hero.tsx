import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Meme Dog in space"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="corgi dog space"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
            <Sparkles className="inline-block w-4 h-4 mr-2" />
            The Ultimate Solana Meme Token is Here!
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter">
            Welcome to <span className="text-primary">Meme Token Mania</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground">
            Join the most gamified presale event in crypto history. Complete quests, climb the leaderboard, and secure your bag of the next legendary meme token.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
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

import { Button } from "@/components/ui/button";
import { Twitter, Send, Users } from "lucide-react";
import Link from "next/link";

export default function CommunitySection() {
  return (
    <section id="community" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary tracking-tighter">
            Join the Neural Network
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            Connect with us, share ideas, and be part of the mission to build the future of AI.
          </p>
          <div className="mt-8 flex justify-center gap-4 md:gap-6">
            <Button size="lg" asChild className="bg-sky-500 hover:bg-sky-600 text-white">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Twitter className="mr-2 h-5 w-5" />
                Twitter / X
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-blue-500 hover:bg-blue-600 text-white">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-5 w-5" />
                Telegram
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-indigo-500 hover:bg-indigo-600 text-white">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Users className="mr-2 h-5 w-5" />
                Discord
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

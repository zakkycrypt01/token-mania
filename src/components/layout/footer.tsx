import { DogPaw } from "@/components/icons";
import { Twitter, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <DogPaw className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">Meme Token Mania</span>
        </div>
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Telegram">
              <Send className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Discord">
              <Users className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Meme Token Mania. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

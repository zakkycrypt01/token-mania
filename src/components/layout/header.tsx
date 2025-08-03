import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/icons";
import WalletButton from "@/components/wallet-button";

export default function Header() {
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#tokenomics", label: "Tokenomics" },
    { href: "#roadmap", label: "Roadmap" },
    { href: "#quests", label: "Quests" },
    { href: "#leaderboard", label: "Leaderboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
          <Logo className="h-7 w-7 text-primary" />
          <span className="hidden sm:inline-block">Neural AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary/90">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex">
             <WalletButton />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Logo className="h-6 w-6 text-primary" />
                  <span>Neural AI</span>
                </Link>
                {navLinks.map((link) => (
                   <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                     {link.label}
                   </Link>
                ))}
                 <div className="w-full mt-4">
                    <WalletButton />
                  </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

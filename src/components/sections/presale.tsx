"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Wallet } from "lucide-react";

const TOKEN_PRICE_IN_SOL = 0.00005;
const MIN_PURCHASE_SOL = 0.1;
const MAX_PURCHASE_SOL = 10;
const PRESALE_PROGRESS = 75;

export default function PresaleSection() {
  const [tokenAmount, setTokenAmount] = useState<string>("10000");

  const solAmount = useMemo(() => {
    const numTokens = parseFloat(tokenAmount);
    if (isNaN(numTokens) || numTokens <= 0) return 0;
    return numTokens * TOKEN_PRICE_IN_SOL;
  }, [tokenAmount]);

  const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty input or numbers
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setTokenAmount(value);
    }
  };

  const handleSolAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const solValue = parseFloat(value);
    if(value === '') {
        setTokenAmount('');
        return;
    }
    if (!isNaN(solValue) && solValue >= 0) {
        const tokens = solValue / TOKEN_PRICE_IN_SOL;
        setTokenAmount(String(Math.floor(tokens)));
    }
  };
  
  const isPurchaseDisabled = solAmount < MIN_PURCHASE_SOL || solAmount > MAX_PURCHASE_SOL;

  return (
    <section id="presale" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary tracking-tighter">
              Get Your Tokens Now!
            </h2>
            <p className="text-lg text-muted-foreground">
              The presale is live! Connect your Phantom wallet to participate. Don't miss out on the opportunity to be an early supporter and get rewarded.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Presale Progress</span>
                <span>{PRESALE_PROGRESS}% Complete</span>
              </div>
              <Progress value={PRESALE_PROGRESS} aria-label={`${PRESALE_PROGRESS}% of presale complete`}/>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>0 SOL</span>
                <span>10,000 SOL</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              1 Token = {TOKEN_PRICE_IN_SOL} SOL
            </p>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Join The Presale</CardTitle>
              <CardDescription>Secure your tokens before they're gone. Connect your wallet to begin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button className="w-full" size="lg">
                <Wallet className="mr-2 h-5 w-5" />
                Connect Phantom Wallet
              </Button>
              <div className="space-y-2">
                <label htmlFor="token-amount" className="text-sm font-medium">You pay (SOL)</label>
                <Input
                  id="sol-amount"
                  type="number"
                  placeholder="e.g., 1.5"
                  value={solAmount > 0 ? solAmount.toFixed(5) : ''}
                  onChange={handleSolAmountChange}
                />
                 <p className="text-xs text-muted-foreground">Min: {MIN_PURCHASE_SOL} SOL, Max: {MAX_PURCHASE_SOL} SOL</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="token-amount" className="text-sm font-medium">You receive (Tokens)</label>
                <Input
                  id="token-amount"
                  type="text"
                  placeholder="e.g., 10000"
                  value={tokenAmount}
                  onChange={handleTokenAmountChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" disabled={isPurchaseDisabled}>
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

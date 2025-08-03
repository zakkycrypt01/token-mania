"use client";

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useToast } from '@/hooks/use-toast';
import WalletButton from '../wallet-button';

const TOKEN_PRICE_IN_SOL = 0.00005;
const MIN_PURCHASE_SOL = 0.1;
const MAX_PURCHASE_SOL = 10;
const PRESALE_PROGRESS = 75;
const PRESALE_WALLET_ADDRESS = 'YOUR_PRESALE_WALLET_ADDRESS_HERE'; // IMPORTANT: Replace with your actual presale wallet address

export default function PresaleSection() {
  const [tokenAmount, setTokenAmount] = useState<string>("10000");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();
  const [isBuying, setIsBuying] = useState(false);

  const solAmount = useMemo(() => {
    const numTokens = parseFloat(tokenAmount);
    if (isNaN(numTokens) || numTokens <= 0) return 0;
    return numTokens * TOKEN_PRICE_IN_SOL;
  }, [tokenAmount]);

  const handleTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\\b]+$/.test(value)) {
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

  const handleBuy = useCallback(async () => {
    if (!publicKey) {
        toast({ title: "Error", description: "Please connect your wallet first.", variant: "destructive" });
        return;
    }
    if (PRESALE_WALLET_ADDRESS === 'YOUR_PRESALE_WALLET_ADDRESS_HERE') {
      toast({ title: "Error", description: "Presale wallet address is not configured.", variant: "destructive" });
      return;
    }

    setIsBuying(true);
    try {
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(PRESALE_WALLET_ADDRESS),
                lamports: solAmount * LAMPORTS_PER_SOL,
            })
        );

        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

        const signature = await sendTransaction(transaction, connection, { minContextSlot });

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        
        toast({ title: "Purchase Successful!", description: `You successfully purchased ${tokenAmount} tokens.` });

    } catch (error: any) {
        console.error("Transaction failed", error);
        toast({ title: "Transaction Failed", description: error.message, variant: "destructive" });
    } finally {
        setIsBuying(false);
    }
}, [publicKey, connection, sendTransaction, solAmount, tokenAmount, toast]);
  
  const isPurchaseDisabled = solAmount < MIN_PURCHASE_SOL || solAmount > MAX_PURCHASE_SOL || isBuying;

  return (
    <section id="presale" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-400">
              Get Your Tokens Now!
            </h2>
            <p className="text-lg text-muted-foreground">
              The presale is live! Connect your wallet to participate. Don't miss out on the opportunity to be an early supporter and get rewarded.
            </p>
            <div className="space-y-2 pt-4">
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
            <p className="text-sm text-muted-foreground pt-4">
              1 Token = {TOKEN_PRICE_IN_SOL} SOL
            </p>
          </div>
          
          <Card className="shadow-2xl bg-card/50 border border-primary/20 backdrop-blur-sm glow-shadow">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Join The Presale</CardTitle>
              <CardDescription>Secure your tokens before they're gone. Connect your wallet to begin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!publicKey ? (
                 <WalletButton />
              ) : (
                <>
                  <div className="space-y-2">
                    <label htmlFor="token-amount" className="text-sm font-medium">You pay (SOL)</label>
                    <Input
                      id="sol-amount"
                      type="number"
                      placeholder="e.g., 1.5"
                      value={solAmount > 0 ? solAmount.toFixed(5) : ''}
                      onChange={handleSolAmountChange}
                      className="bg-background/80"
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
                      className="bg-background/80"
                    />
                  </div>
                </>
              )}
            </CardContent>
             {publicKey && (
                <CardFooter>
                  <Button size="lg" className="w-full" disabled={isPurchaseDisabled} onClick={handleBuy}>
                    {isBuying ? "Processing..." : "Buy Now"}
                  </Button>
                </CardFooter>
             )}
          </Card>
        </div>
      </div>
    </section>
  );
}

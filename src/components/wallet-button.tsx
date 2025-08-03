"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const WalletButton = () => {
    const { wallet, publicKey, connect, select, connecting, disconnecting } = useWallet();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const formattedAddress = publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : "Connect Wallet";

    if (!isClient) {
        return (
             <Button variant="default" disabled={true}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
            </Button>
        );
    }

    return (
        <WalletMultiButton style={{ 
            '--wallet-adapter-button-background-color': 'hsl(var(--primary))',
            '--wallet-adapter-button-hover-color': 'hsl(var(--primary) / 0.9)',
         } as React.CSSProperties}>
            <Wallet className="mr-2 h-4 w-4" />
            {wallet ? formattedAddress : "Connect Wallet"}
        </WalletMultiButton>
    );
};

export default WalletButton;

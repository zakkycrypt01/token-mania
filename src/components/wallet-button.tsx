"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

const WalletButton = () => {
    const { wallet } = useWallet();

    return (
        <WalletMultiButton style={{}}>
            <Wallet className="mr-2 h-4 w-4" />
            {!wallet ? "Connect Wallet" : "My Wallet"}
        </WalletMultiButton>
    );
};

export default WalletButton;

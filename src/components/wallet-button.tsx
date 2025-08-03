"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

const WalletButton = () => {
    const { wallet, publicKey } = useWallet();

    const formattedAddress = publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : "Connect Wallet";

    return (
        <WalletMultiButton style={{}}>
            <Wallet className="mr-2 h-4 w-4" />
            {wallet ? formattedAddress : "Connect Wallet"}
        </WalletMultiButton>
    );
};

export default WalletButton;

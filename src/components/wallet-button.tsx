"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";

const WalletButton = () => {
    const { wallet, publicKey } = useWallet();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const formattedAddress = publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : "Connect Wallet";

    if (!isClient) {
        return null;
    }

    return (
        <WalletMultiButton style={{}}>
            <Wallet className="mr-2 h-4 w-4" />
            {wallet ? formattedAddress : "Connect Wallet"}
        </WalletMultiButton>
    );
};

export default WalletButton;


'use client';
import { useWallet } from "@solana/wallet-adapter-react";
import { setCookie } from 'cookies-next';
import { useEffect } from "react";

export function WalletMiddleware({ children }: { children: React.ReactNode }) {
    const { publicKey } = useWallet();

    useEffect(() => {
        if (publicKey) {
            const walletAddress = publicKey.toBase58();
            // This cookie will be sent with server action headers
            setCookie('wallet-address', walletAddress, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'lax',
            });
        }
    }, [publicKey]);

    return <>{children}</>;
}

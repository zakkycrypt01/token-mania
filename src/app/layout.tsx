import type {Metadata} from 'next';
import './globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import WalletProvider from '@/components/providers/wallet-provider';

export const metadata: Metadata = {
  title: 'Meme Token Mania',
  description: 'The most epic gamified meme token presale on Solana!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        <WalletProvider>
          {children}
        </WalletProvider>
        <Toaster />
      </body>
    </html>
  );
}

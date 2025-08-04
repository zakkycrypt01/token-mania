import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWalletFromHeaders(headers: ReadonlyHeaders): string | null {
    return headers.get('x-wallet-address');
}

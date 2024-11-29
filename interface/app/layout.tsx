"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "viem/chains";
import { createConfig, http, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import "./globals.css";

import { moai } from "./moai";

const config = createConfig({
  chains: [sepolia, moai],
  transports: {
    [sepolia.id]: http("https://rpc.sepolia.org"),
    [moai.id]: http("https://rpc.moai.cash"),
  },
  connectors: [injected()],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}s
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

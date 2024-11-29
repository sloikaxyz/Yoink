"use client";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import "./globals.css";

const moai = {
  id: 42069,
  name: "mo.ai",
  rpcUrls: {
    public: { http: ["https://rpc.moai.cash"] },
    default: { http: ["https://rpc.moai.cash"] },
  },
  network: "moai",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [moai],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: () => ({
        http: "https://rpc.moai.cash",
      }),
    }),
  ]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={config}>{children}</WagmiConfig>
      </body>
    </html>
  );
}

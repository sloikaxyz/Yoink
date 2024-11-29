'use client'

import './globals.css'
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { base } from 'wagmi/chains'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <body>{children}</body>
      </WagmiConfig>
    </html>
  )
}

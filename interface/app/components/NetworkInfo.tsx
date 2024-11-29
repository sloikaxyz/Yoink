'use client'

import { useCallback } from 'react'

const NETWORK_CONFIG = {
  chainId: '0xA455', // 42069 in hex
  chainName: 'mo.ai',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['http://rpc.ai.caffeinum.com:8545'],
  blockExplorerUrls: ['']
}

const BRIDGE_ADDRESS = '0x8FFa37c4493e9621fdCC4a0E6959d5c8f1B2F0c2'

export function NetworkInfo() {
  const addNetwork = useCallback(async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!')
      return
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [NETWORK_CONFIG],
      })
    } catch (error) {
      console.error('Error adding network:', error)
    }
  }, [])

  return (
    <div className="bg-gray-800 p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Network Information</h2>
      
      <div className="space-y-2">
        <p>RPC URL: {NETWORK_CONFIG.rpcUrls[0]}</p>
        <p>Chain ID: {parseInt(NETWORK_CONFIG.chainId)}</p>
        <button
          onClick={addNetwork}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Network to Wallet
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Bridge Your ETH</h3>
        <p className="font-mono break-all bg-gray-700 p-2 rounded">
          Bridge Address: {BRIDGE_ADDRESS}
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Send ETH to this address to bridge it to mo.ai network
        </p>
      </div>
    </div>
  )
}

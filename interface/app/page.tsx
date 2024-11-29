'use client'

import { useState } from 'react'
import { useContractRead, useContractWrite, useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { parseEther } from 'viem'
import { NetworkInfo } from './components/NetworkInfo'

const FREYSA_ADDRESS = '0x750C3f90549774b4a0367cF9D583187b44D1C775'

const FREYSA_ABI = [
  'function getCurrentQueryFee() view returns (uint256)',
  'function prizePool() view returns (uint256)',
  'function submitQuery(string) payable',
]

export default function Home() {
  const [message, setMessage] = useState('')
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { data: currentFee } = useContractRead({
    address: FREYSA_ADDRESS,
    abi: FREYSA_ABI,
    functionName: 'getCurrentQueryFee',
  })

  const { data: prizePool } = useContractRead({
    address: FREYSA_ADDRESS,
    abi: FREYSA_ABI,
    functionName: 'prizePool',
  })

  const { write: submitQuery } = useContractWrite({
    address: FREYSA_ADDRESS,
    abi: FREYSA_ABI,
    functionName: 'submitQuery',
  })

  const handleSubmit = () => {
    if (!currentFee) return
    submitQuery({
      args: [message],
      value: currentFee,
    })
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => connect()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Freysa Interface</h1>
        
        <NetworkInfo />
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Current Stats</h2>
          <p>Current Fee: {currentFee ? (Number(currentFee) / 1e18).toFixed(6) : '...'} ETH</p>
          <p>Prize Pool: {prizePool ? (Number(prizePool) / 1e18).toFixed(6) : '...'} ETH</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Submit Query</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            rows={4}
            placeholder="Enter your message..."
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Query
          </button>
        </div>
      </div>
    </main>
  )
}

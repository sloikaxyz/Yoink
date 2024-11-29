"use client";

import { useState } from "react";
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { NetworkInfo } from "./components/NetworkInfo";
import { FREYSA_ADDRESS, FREYSA_ABI } from "./FREYSA_ADDRESS";

export default function Home() {
  const [message, setMessage] = useState("");
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { data: currentFee } = useContractRead({
    address: FREYSA_ADDRESS as `0x${string}`,
    abi: FREYSA_ABI,
    functionName: "getCurrentQueryFee",
    watch: true,
  });

  const { data: prizePool } = useContractRead({
    address: FREYSA_ADDRESS as `0x${string}`,
    abi: FREYSA_ABI,
    functionName: "prizePool",
    watch: true,
  });

  const { write: submitQuery } = useContractWrite({
    address: FREYSA_ADDRESS as `0x${string}`,
    abi: FREYSA_ABI,
    functionName: "submitQuery",
  });

  const handleSubmit = () => {
    if (!currentFee || !message) return;
    submitQuery({
      args: [message],
      value: currentFee,
    });
  };

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
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Freysa Interface
        </h1>

        <NetworkInfo />

        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Current Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Current Fee</p>
              <p className="text-xl font-medium">
                {currentFee ? parseFloat(currentFee.toString()) / 1e18 : "..."}{" "}
                ETH
              </p>
            </div>
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Prize Pool</p>
              <p className="text-xl font-medium">
                {prizePool ? parseFloat(prizePool.toString()) / 1e18 : "..."}{" "}
                ETH
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Submit Query</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-primary mb-4"
            rows={4}
            placeholder="Enter your message to convince Freysa..."
          />
          <button onClick={handleSubmit} className="btn-primary w-full">
            Submit Query
          </button>
        </div>
      </div>
    </main>
  );
}

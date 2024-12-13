"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { decodeFunctionResult, formatUnits } from "viem";
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { NetworkInfo } from "./components/NetworkInfo";
import {
  gekkonAddress,
  gekkonAbi,
  useReadGekkonGetCurrentQueryFee,
  useReadGekkonPrizePool,
  useSimulateGekkonSubmitQuery,
} from "./generated";
import { GameRules } from "./components/GameRules";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | undefined>(undefined);
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const { data: currentFee } = useReadGekkonGetCurrentQueryFee();
  const { data: prizePool } = useReadGekkonPrizePool();
  const { writeContractAsync } = useWriteContract();

  const { data: submitQuery } = useSimulateGekkonSubmitQuery({
    args: [message],
    value: currentFee,
  });

  const {
    isPending,
    mutate: handleSubmit,
    data: tx,
  } = useMutation({
    mutationKey: ["submitQuery", message],
    mutationFn: async () => {
      console.log("Submitting query", message, submitQuery);

      if (!submitQuery) return;

      const tx = await writeContractAsync(submitQuery.request);
      console.log("Transaction sent", tx);
      return tx;
    },
  });

  const { isLoading: isWaitingForTx } = useWaitForTransactionReceipt({
    hash: tx,
  });

  useWatchContractEvent({
    address: gekkonAddress[80418041],
    abi: gekkonAbi,
    eventName: "SystemResponse",
    onLogs(logs) {
      console.log("New logs!", logs);

      setResponse(logs[0].args.response);
    },
  });

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <header className="text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Gekkon Interface
            </h1>
            <p className="text-gray-400 mt-2">Challenge the AI, Win the Pool</p>
          </header>
          {isConnected ? (
            <NetworkInfo />
          ) : (
            <button
              onClick={() => connect({ connector: connectors[0] })}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Connect Wallet
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="card bg-gray-800/50 backdrop-blur">
              <h2 className="text-2xl font-bold mb-6">Current Stats</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                  <p className="text-blue-300 text-sm mb-1">Current Fee</p>
                  <p className="text-2xl font-medium">
                    {currentFee ? formatUnits(currentFee, 18) : "..."} ETH
                  </p>
                </div>
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
                  <p className="text-purple-300 text-sm mb-1">Prize Pool</p>
                  <p className="text-2xl font-medium">
                    {prizePool ? formatUnits(prizePool, 18) : "..."} ETH
                  </p>
                </div>
              </div>
            </div>

            <GameRules />
          </div>

          <div className="space-y-8">
            <div className="card bg-gray-800/50 backdrop-blur">
              <h2 className="text-2xl font-bold mb-6">Submit Query</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={4}
                placeholder={
                  isConnected
                    ? "Enter your message to convince Gekkon..."
                    : "Connect your wallet to submit a query..."
                }
                disabled={!isConnected}
              />
              <button
                onClick={() => handleSubmit()}
                disabled={
                  !isConnected || !submitQuery || isPending || isWaitingForTx
                }
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {!isConnected ? (
                  "Connect Wallet to Submit"
                ) : isPending || isWaitingForTx ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Submit Query"
                )}
              </button>
            </div>

            {response && (
              <div className="card bg-gray-800/50 backdrop-blur animate-fadeIn">
                <h2 className="text-2xl font-bold mb-6">Gekkon's Response</h2>
                <p className="text-gray-300">{response}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { formatUnits } from "viem";
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { NetworkInfo } from "./components/NetworkInfo";
import {
  freysaAbi,
  freysaAddress,
  useReadFreysaGetCurrentQueryFee,
  useReadFreysaPrizePool,
  useSimulateFreysaSubmitQuery,
} from "./generated";

const decodeString = (str: `0x${string}`) => {
  return Buffer.from(str.slice(2), "hex").toString("utf-8");
};

export default function Home() {
  const [message, setMessage] = useState("");
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const { data: currentFee } = useReadFreysaGetCurrentQueryFee();
  const { data: prizePool } = useReadFreysaPrizePool();
  const { data: response, writeContractAsync } = useWriteContract();

  const { data: submitQuery } = useSimulateFreysaSubmitQuery({
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
    address: freysaAddress[42069],
    abi: freysaAbi,
    eventName: "SystemResponse",
    onLogs(logs) {
      console.log("New logs!", logs);

      alert(logs[0].args.response);
    },
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => connect({ connector: connectors[0] })}
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
                {currentFee ? formatUnits(currentFee, 18) : "..."} ETH
              </p>
            </div>
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Prize Pool</p>
              <p className="text-xl font-medium">
                {prizePool ? formatUnits(prizePool, 18) : "..."} ETH
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
          <button
            onClick={() => handleSubmit()}
            disabled={!submitQuery || isPending || isWaitingForTx}
            className="btn-primary w-full"
          >
            {isPending || isWaitingForTx ? "Submitting..." : "Submit Query"}
          </button>
        </div>

        {response && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Response</h2>
            <p>{decodeString(response)}</p>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { NetworkInfo } from "../components/NetworkInfo";
import {
  useReadMemeDaoDaoToken,
  useReadErc20TotalSupply,
  useSimulateMemeDaoPitchToken,
  useWriteMemeDaoPitchToken,
  useWatchMemeDaoPitchSubmittedEvent,
  useWatchMemeDaoInvestmentMadeEvent,
  useWatchMemeDaoTokensDistributedEvent,
} from "../generated";

export default function MemeDAO() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [pitch, setPitch] = useState("");
  const [events, setEvents] = useState<
    Array<{
      type: string;
      data: any;
      timestamp: number;
    }>
  >([]);

  const { address, isConnected } = useAccount();
  const { data: daoTokenAddress } = useReadMemeDaoDaoToken();
  const { data: totalSupply } = useReadErc20TotalSupply({
    address: daoTokenAddress,
  });

  const { data: simulatePitch } = useSimulateMemeDaoPitchToken({
    args: [tokenAddress as `0x${string}`, pitch],
    value: parseEther("0.01"), // PITCH_FEE from contract
  });

  const { writeContractAsync } = useWriteMemeDaoPitchToken();

  // Watch for events
  useWatchMemeDaoPitchSubmittedEvent({
    onLogs(logs) {
      const newEvents = logs.map((log) => ({
        type: "Pitch Submitted",
        data: {
          pitcher: log.args.pitcher,
          token: log.args.token,
          pitch: log.args.pitch,
        },
        timestamp: Date.now(),
      }));
      setEvents((prev) => [...newEvents, ...prev]);
    },
  });

  useWatchMemeDaoInvestmentMadeEvent({
    onLogs(logs) {
      const newEvents = logs.map((log) => ({
        type: "Investment Made",
        data: {
          token: log.args.token,
          amount: formatEther(log.args.amount ?? BigInt(0)),
        },
        timestamp: Date.now(),
      }));
      setEvents((prev) => [...newEvents, ...prev]);
    },
  });

  useWatchMemeDaoTokensDistributedEvent({
    onLogs(logs) {
      const newEvents = logs.map((log) => ({
        type: "Tokens Distributed",
        data: {
          pitcher: log.args.pitcher,
          amount: formatEther(log.args.amount ?? BigInt(0)),
        },
        timestamp: Date.now(),
      }));
      setEvents((prev) => [...newEvents, ...prev]);
    },
  });

  const handleSubmit = async () => {
    if (!simulatePitch) return;

    try {
      const tx = await writeContractAsync(simulatePitch.request);
      console.log("Transaction sent:", tx);
    } catch (error) {
      console.error("Error submitting pitch:", error);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <header className="text-center">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              MemeDAO
            </h1>
            <p className="text-gray-400 mt-2">Pitch Your Memecoin to the AI</p>
          </header>
          {isConnected ? (
            <NetworkInfo />
          ) : (
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all">
              Connect Wallet
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Submit Pitch</h2>
              <input
                type="text"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="Token Contract Address (0x...)"
                className="w-full p-3 mb-4 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white"
              />
              <textarea
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                placeholder="Enter your pitch for the memecoin..."
                className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white h-32"
              />
              <button
                onClick={handleSubmit}
                disabled={!isConnected || !simulatePitch}
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Submit Pitch (0.01 ETH)
              </button>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-4">DAO Stats</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-900/20 rounded-lg">
                  <p className="text-blue-300 text-sm mb-1">MEMEGOD Supply</p>
                  <p className="text-2xl font-medium">
                    {totalSupply ? formatEther(totalSupply) : "..."} MEMEGOD
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {events.map((event, i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-700/30 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-blue-400 font-semibold">
                        {event.type}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300">
                      {Object.entries(event.data).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-gray-400">{key}:</span>{" "}
                          {String(value)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

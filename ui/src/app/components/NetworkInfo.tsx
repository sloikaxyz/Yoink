"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from "wagmi";

import { formatUnits, parseEther } from "viem";
import { sepolia } from "wagmi/chains";
import { moai } from "../moai";

const BRIDGE_ADDRESS = "0x8FFa37c4493e9621fdCC4a0E6959d5c8f1B2F0c2";

export function NetworkInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeTxHash, setBridgeTxHash] = useState<string>();
  const [bridgeError, setBridgeError] = useState<string>();
  const [bridgeStatus, setBridgeStatus] = useState<string>();

  const { switchChain, error: switchError } = useSwitchChain({});

  const { sendTransactionAsync } = useSendTransaction();

  const { isSuccess: isBridgeComplete } = useWaitForTransactionReceipt({
    chainId: sepolia.id,
    hash: bridgeTxHash as `0x${string}`,
  });

  const { address } = useAccount();
  const { data: moaiBalance } = useBalance({
    address,
    chainId: moai.id,
  });

  const { chain } = useAccount();

  useEffect(() => {
    if (isBridgeComplete && chain?.id === sepolia.id) {
      setBridgeStatus("Bridge complete! Switching back to Moai...");
      switchChain?.({ chainId: moai.id });
      setTimeout(() => {
        setIsBridging(false);
        setBridgeTxHash(undefined);
        setBridgeStatus(undefined);
        setBridgeError(undefined);
      }, 2000);
    }
  }, [isBridgeComplete, chain?.id, switchChain]);

  const addNetwork = useCallback(async () => {
    if (switchChain) {
      switchChain({ chainId: moai.id });
    }
  }, [switchChain]);

  const handleBridge = async () => {
    setBridgeError(undefined);

    try {
      if (chain?.id !== sepolia.id) {
        setIsBridging(true);
        setBridgeStatus("Switching to Sepolia...");

        // First switch to Sepolia
        switchChain?.({ chainId: sepolia.id });
      }

      setBridgeStatus("Initiating bridge transaction...");

      // Send the bridge transaction

      const txHash = await sendTransactionAsync?.({
        to: BRIDGE_ADDRESS,
        value: parseEther("0.1"),
      });

      setBridgeTxHash(txHash);
      switchChain?.({ chainId: moai.id });
    } catch (error) {
      console.error("Bridge error:", error);
      setBridgeError(error instanceof Error ? error.message : "Bridge failed");
      setIsBridging(false);
      setBridgeTxHash(undefined);
      setBridgeStatus(undefined);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all"
      >
        {chain?.id === moai.id ? (
          <>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-sm">Connected to mo.ai</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <span className="text-sm">Switch to mo.ai</span>
          </>
        )}

        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[400px] bg-gray-800/95 rounded-lg shadow-xl z-50 animate-fadeIn">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Network Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">RPC URL</span>
                <span className="font-mono text-sm">
                  {moai.rpcUrls.default.http[0]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Chain ID</span>
                <span className="font-mono">{moai.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Balance</span>
                <span className="font-mono">
                  {moaiBalance
                    ? `${formatUnits(moaiBalance.value, moaiBalance.decimals)} ${
                        moaiBalance.symbol
                      }`
                    : "..."}
                </span>
              </div>
            </div>

            <button
              onClick={addNetwork}
              className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
                chain?.id === moai.id
                  ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {chain?.id === moai.id ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Connected to mo.ai
                </div>
              ) : (
                "Switch to mo.ai Network"
              )}
            </button>

            {switchError && (
              <p className="text-red-500 text-sm mt-2">
                Error switching network. Please make sure your wallet is
                connected.
              </p>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Bridge ETH</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Bridge Address</p>
                  <p
                    className="font-mono text-sm break-all bg-gray-900/50 p-2 rounded cursor-pointer"
                    onClick={() =>
                      navigator.clipboard.writeText(BRIDGE_ADDRESS)
                    }
                  >
                    {BRIDGE_ADDRESS}
                  </p>

                  <p className="text-sm text-gray-400">
                    Send ETH to this address to bridge it to mo.ai network
                  </p>
                </div>

                <button
                  onClick={handleBridge}
                  disabled={isBridging}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 
                           disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                  Bridge 0.1 ETH
                </button>

                {bridgeStatus && (
                  <div className="text-sm text-blue-400 text-center">
                    {bridgeStatus}
                    {bridgeTxHash && (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${bridgeTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-blue-300 underline mt-1"
                      >
                        View on Etherscan
                      </a>
                    )}
                  </div>
                )}

                {bridgeError && (
                  <div className="text-sm text-red-400 text-center">
                    Error: {bridgeError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

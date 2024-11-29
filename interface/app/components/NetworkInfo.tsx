"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Chain,
  useAccount,
  useBalance,
  useContractRead,
  useNetwork,
  useSendTransaction,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import { FREYSA_ABI, FREYSA_ADDRESS } from "../FREYSA_ADDRESS";

const moaiChain: Chain = {
  id: 42069,
  name: "mo.ai",
  network: "moai",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.moai.cash"] },
    public: { http: ["https://rpc.moai.cash"] },
  },
  blockExplorers: {
    default: { name: "MoaiScan", url: "" },
  },
};

const BRIDGE_ADDRESS = "0x8FFa37c4493e9621fdCC4a0E6959d5c8f1B2F0c2";

export function NetworkInfo() {
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeTxHash, setBridgeTxHash] = useState<string>();
  const [bridgeError, setBridgeError] = useState<string>();
  const [bridgeStatus, setBridgeStatus] = useState<string>();

  const { chain } = useNetwork();
  const { switchNetwork, error: switchError } = useSwitchNetwork({
    chainId: moaiChain.id,
  });

  const { sendTransactionAsync: sendBridgeTx } = useSendTransaction();

  const { isSuccess: isBridgeComplete } = useWaitForTransaction({
    chainId: sepolia.id,
    hash: bridgeTxHash as `0x${string}`,
  });

  const { data: currentFee } = useContractRead({
    address: FREYSA_ADDRESS as `0x${string}`,
    abi: FREYSA_ABI,
    functionName: "getCurrentQueryFee",
    watch: true,
  });

  const { address } = useAccount();
  const { data: moaiBalance } = useBalance({
    address,
    chainId: moaiChain.id,
  });

  useEffect(() => {
    if (isBridgeComplete && chain?.id === sepolia.id) {
      setBridgeStatus("Bridge complete! Switching back to Moai...");
      switchNetwork?.(moaiChain.id);
      setTimeout(() => {
        setIsBridging(false);
        setBridgeTxHash(undefined);
        setBridgeStatus(undefined);
        setBridgeError(undefined);
      }, 2000);
    }
  }, [isBridgeComplete, chain?.id, switchNetwork]);

  const addNetwork = useCallback(async () => {
    if (switchNetwork) {
      switchNetwork();
    }
  }, [switchNetwork]);

  const handleBridge = async () => {
    setBridgeError(undefined);

    try {
      if (chain?.id !== moaiChain.id) {
        setIsBridging(true);
        setBridgeStatus("Switching to Sepolia...");

        // First switch to Sepolia
        await switchNetwork?.(sepolia.id);
        setBridgeStatus("Initiating bridge transaction...");

        // Send the bridge transaction
        if (sendBridgeTx && currentFee) {
          const tx = await sendBridgeTx({
            to: BRIDGE_ADDRESS,
            value: currentFee,
          });
          setBridgeTxHash(tx.hash);
          setBridgeStatus("Waiting for bridge confirmation...");
        } else {
          throw new Error("Failed to prepare bridge transaction");
        }

        return;
      }
    } catch (error) {
      console.error("Bridge error:", error);
      setBridgeError(error instanceof Error ? error.message : "Bridge failed");
      setIsBridging(false);
      setBridgeTxHash(undefined);
      setBridgeStatus(undefined);
    }
  };
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg space-y-6 border border-gray-700">
      <div>
        <h2 className="text-xl font-bold mb-4">Network Information</h2>
        <div className="grid gap-3">
          <div className="flex justify-between items-center py-2 px-3 bg-gray-800 rounded-md">
            <span className="text-gray-400">RPC URL</span>
            <span className="font-mono text-sm">{moaiChain.rpcUrls.default.http[0]}</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-gray-800 rounded-md">
            <span className="text-gray-400">Chain ID</span>
            <span className="font-mono">{moaiChain.id}</span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-gray-800 rounded-md">
            <span className="text-gray-400">Balance</span>
            <span className="font-mono">
              {moaiBalance
                ? `${parseFloat(moaiBalance.formatted).toFixed(4)} ${moaiBalance.symbol}`
                : "..."}
            </span>
          </div>
        </div>

        <button
          onClick={addNetwork}
          className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
            chain?.id === moaiChain.id
              ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {chain?.id === moaiChain.id ? (
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
            Error switching network. Please make sure your wallet is connected.
          </p>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Bridge Your ETH</h3>
        <div className="bg-gray-800 p-3 rounded-md">
          <p className="text-gray-400 text-sm mb-1">Bridge Address</p>
          <p className="font-mono text-sm break-all">{BRIDGE_ADDRESS}</p>
        </div>
        <p className="text-sm text-gray-400">
          Send ETH to this address to bridge it to mo.ai network
        </p>

        <button
          onClick={handleBridge}
          disabled={isBridging}
          className="w-full py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed transition-colors"
        >
          {isBridging ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Bridging in progress...
            </div>
          ) : (
            "Bridge ETH"
          )}
        </button>

        {bridgeStatus && (
          <div className="mt-4 space-y-2">
            <div className="text-sm text-center text-blue-400">{bridgeStatus}</div>
            {bridgeTxHash && (
              <div className="text-sm text-center">
                <a
                  href={`https://sepolia.etherscan.io/tx/${bridgeTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  View on Etherscan
                </a>
              </div>
            )}
          </div>
        )}

        {bridgeError && (
          <div className="text-sm text-red-400 text-center mt-2">
            Error: {bridgeError}
          </div>
        )}
      </div>
    </div>
  );
}

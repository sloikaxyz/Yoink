"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useSwitchNetwork,
  useNetwork,
  Chain,
  useSendTransaction,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import { FREYSA_ADDRESS, FREYSA_ABI } from "../FREYSA_ADDRESS";

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
    <div className="bg-gray-800 p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Network Information</h2>

      <div className="space-y-2">
        <p>RPC URL: {moaiChain.rpcUrls.default.http[0]}</p>
        <p>Chain ID: {moaiChain.id}</p>
        <button
          onClick={addNetwork}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {chain?.id === moaiChain.id
            ? "Connected to mo.ai"
            : "Switch to mo.ai Network"}
        </button>
        {switchError && (
          <p className="text-red-500 text-sm mt-2">
            Error switching network. Please make sure your wallet is connected.
          </p>
        )}
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

      <div className="space-y-4">
        <button
          onClick={handleBridge}
          className="btn-primary w-full"
          disabled={isBridging}
        >
          {isBridging ? "Bridging in progress..." : "Bridge ETH"}
        </button>

        {bridgeStatus && (
          <div className="space-y-2">
            <div className="text-sm text-center">{bridgeStatus}</div>

            <div className="text-sm text-blue-400 text-center">
              {bridgeTxHash && (
                <a
                  href={`https://sepolia.etherscan.io/tx/${bridgeTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </a>
              )}
            </div>
          </div>
        )}

        {bridgeError && (
          <div className="text-sm text-red-400 text-center">
            Error: {bridgeError}
          </div>
        )}
      </div>
    </div>
  );
}

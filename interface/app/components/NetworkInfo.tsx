"use client";

import { useCallback } from "react";
import { useSwitchNetwork, useNetwork, Chain } from "wagmi";

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
  const { chain } = useNetwork();
  const { switchNetwork, error: switchError } = useSwitchNetwork({
    chainId: moaiChain.id,
  });

  const addNetwork = useCallback(async () => {
    if (switchNetwork) {
      switchNetwork();
    }
  }, [switchNetwork]);

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
          {chain?.id === moaiChain.id ? "Connected to mo.ai" : "Switch to mo.ai Network"}
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
    </div>
  );
}

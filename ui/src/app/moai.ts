import { Chain } from "viem";

export const moai: Chain = {
  id: 80418041,
  name: "mo.ai",
  rpcUrls: {
    public: { http: ["https://rpc.moai.cash"] },
    default: { http: ["https://rpc.moai.cash"] },
  },
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
};

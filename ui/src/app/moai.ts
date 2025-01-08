import { Chain } from "viem";

export const MOAI_RPC = "https://london-maxihost-103-50-32-58.ankr.com/moai_op_archive_rpc_1"

export const moai: Chain = {
  id: 80418041,
  name: "mo.ai",
  rpcUrls: {
    public: { http: [MOAI_RPC] },
    default: { http: [MOAI_RPC] },
  },
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
};

import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { moai, MOAI_RPC } from "./app/moai";

export function getConfig() {
  const config = createConfig({
    chains: [sepolia, moai],
    transports: {
      [sepolia.id]: http("https://rpc.sepolia.org"),
      [moai.id]: http(MOAI_RPC),
    },
    connectors: [injected()],

    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
  });

  return config;
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}

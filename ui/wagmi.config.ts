import { defineConfig } from "@wagmi/cli";
import { react, foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/app/generated.ts",

  plugins: [
    react(),
    foundry({
      project: "../",

      deployments: {
        MemeGod: {
          80418041: "0x84a964F3493Fd18ACa6d6FB1544F18cB7c87b078",
        },

        MemeDAO: {
          80418041: "0x7649Ed22479E3f2C02165DCBBd0673e59D04bd27",
        },

        PokemonLeague: {
          80418041: "0x0418F571CBd042C3210bFF7552f0fa843775eB78",
        },

        Gekkon: {
          80418041: "0xF9753cB66F0C5f97dcf6C28C66E8a256D92288a2",
        },
      },
    }),
  ],
});

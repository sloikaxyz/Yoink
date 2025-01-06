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
          80418041: "0x7B3e3758a35CE827B63c04416DDDbf804543835f",
        },

        MemeDAO: {
          80418041: "0x308FA9a6d5527c2d93e05B60ff46b401A6dd459f",
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

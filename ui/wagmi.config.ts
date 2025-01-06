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
          80418041: "0xAa47E8814317B183be45C58da7cf24f37FAf941C",
        },

        MemeDAO: {
          80418041: "0x2490Cd4412540fE02dE71122d6c596f58e8137e6",
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

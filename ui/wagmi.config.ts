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
          80418041: "0x308FA9a6d5527c2d93e05B60ff46b401A6dd459f",
        },

        MemeDAO: {
          80418041: "0x4335f53403B98407B5d9735efcB971c4440C7f2b",
        },

        PokemonLeague: {
          80418041: "0x7B3e3758a35CE827B63c04416DDDbf804543835f",
        },

        Gekkon: {
          80418041: "0x7B3e3758a35CE827B63c04416DDDbf804543835f",
        },
      },
    }),
  ],
});

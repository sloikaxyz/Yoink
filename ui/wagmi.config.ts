import { defineConfig } from "@wagmi/cli";
import { react, foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/app/generated.ts",

  plugins: [
    react(),
    foundry({
      project: "../",

      deployments: {
        Freysa: {
          80418041: "0x7B3e3758a35CE827B63c04416DDDbf804543835f",
        },
      },
    }),
  ],
});

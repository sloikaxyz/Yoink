import { defineConfig } from "@wagmi/cli";
import { react, foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "app/generated.ts",

  plugins: [
    react(),
    foundry({
      project: "../",

      deployments: {
        Freysa: {
          42069: "0x7084E3E57aaC6093AF44d02490D0dfba9503Ce4E",
        },
      },
    }),
  ],
});

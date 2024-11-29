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
          42069: "0xBc92119F97a2049B6d7ff22e6EC32F92dbCFfa6D",
        },
      },
    }),
  ],
});

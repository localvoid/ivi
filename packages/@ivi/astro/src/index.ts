import type { AstroConfig, AstroIntegration, AstroRenderer } from "astro";
import { ivi } from "@ivi/vite-plugin";

function getRenderer(): AstroRenderer {
  return {
    name: "@ivi/astro",
    clientEntrypoint: "@ivi/astro/client.js",
    serverEntrypoint: "@ivi/astro/server.js",
  };
}

async function getViteConfiguration(isDev: boolean, astroConfig: AstroConfig) {
  return {
    optimizeDeps: {
      include: ["ivi"],
      exclude: ["@ivi/astro/server.js"],
    },
    ssr: {
      target: "node",
      external: ["ivi/ssr"],
      noExternal: ["ivi"],
    },
    plugins: [ivi()],
  };
}

export default function (): AstroIntegration {
  return {
    name: "@ivi/astro",
    hooks: {
      "astro:config:setup": async ({
        command,
        addRenderer,
        updateConfig,
        config,
      }) => {
        addRenderer(getRenderer());
        updateConfig({
          vite: await getViteConfiguration(command === "dev", config),
        });
      },
    },
  };
}

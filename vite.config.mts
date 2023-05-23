import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      datasets: path.resolve(__dirname, "datasets"),
    },
  },
});

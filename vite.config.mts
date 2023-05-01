import path from "node:path";
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [glsl()],
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

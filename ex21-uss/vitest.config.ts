import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    setupFiles: ["./testSetup.ts"],
    globals: true,
    environment: "node",
    coverage: {
      //provider: "istanbul",
      provider: "v8",
    },
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
})

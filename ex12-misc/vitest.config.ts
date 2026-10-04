import path from "path"
import { coverageConfigDefaults } from "vitest/config"

export default {
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./testSetup.js"],
    coverage: {
      //provider: "istanbul",
      provider: "v8",
      // dev.ts: starts the app for local use, not part of the app
      exclude: [...coverageConfigDefaults.exclude, "src/uss/dev.ts"],
    },
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
}

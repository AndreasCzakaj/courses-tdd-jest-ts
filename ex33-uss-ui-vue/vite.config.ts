import path from "path"
import vue from "@vitejs/plugin-vue"

// https://vite.dev/config/
export default {
  plugins: [vue()],
  test: {
    globals: true, // so you can use `describe, it, expect` without importing them each time (optional)
    environment: "jsdom", // simulate a DOM environment so we can mount components
    include: ["test/**/*.spec.ts", "test/**/*.test.ts"],
    coverage: {
      include: ["src/**"],
      exclude: ["src/index.ts"],
    },
    exclude: ["bkp", "dist", "node_modules"],
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
}

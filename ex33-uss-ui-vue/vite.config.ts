import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // so you can use `describe, it, expect` without importing them each time (optional)
    environment: "jsdom", // simulate a DOM environment so we can mount components
    include: ["test/**/*.spec.ts", "test/**/*.test.ts"],
  },
})

import path from "path"

export default {
  test: {
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
}
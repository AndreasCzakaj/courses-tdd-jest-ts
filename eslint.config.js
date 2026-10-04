import js from "@eslint/js"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/",
      "**/coverage/",
      "**/dist/",
      "**/build/",
      "**/*.d.ts",
      "**/*.config.ts",
      "**/testSetup.js",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // metric: break the build for functions with a CCN above 5
      complexity: ["error", 5],
      // unused params are fine, e.g. in stubs
      "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
    },
  },
  {
    // the exercises come with unused imports and variables: they are hints for the solution
    files: ["**/test/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
)

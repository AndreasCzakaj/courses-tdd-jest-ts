import { pathsToModuleNameMapper } from "ts-jest"
import { compilerOptions } from "./tsconfig.json"

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/node_modules/",
    "!<rootDir>/test",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  coverageReporters: ["text"],
  reporters: ["default"],
  watchPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/coverage/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
  ],
  testRegex: [".*\\.test\\.ts$"],
}

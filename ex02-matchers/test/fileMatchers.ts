import { existsSync, readFileSync } from "node:fs"

// A custom matcher is a function that gets the ACTUAL value (+ optional params)
// and returns
// - `pass`: did it match?
// - `message`: what to print if the assertion fails
//   (for `.not` the assertion fails when `pass` is true => 2 messages)
expect.extend({
  toExist(received: string) {
    const pass = existsSync(received)
    return {
      pass,
      message: () =>
        pass
          ? `expected file ${received} not to exist`
          : `expected file ${received} to exist`,
    }
  },

  toContainLine(received: string, expected: string) {
    const lines = existsSync(received)
      ? readFileSync(received, "utf8").split("\n")
      : []
    const pass = lines.includes(expected)
    return {
      pass,
      message: () =>
        pass
          ? `expected file ${received} not to contain the line '${expected}'`
          : `expected file ${received} to contain the line '${expected}'`,
    }
  },
})

// make TypeScript (and your IDE) aware of the new matchers
interface FileMatchers<R = unknown> {
  toExist(): R
  toContainLine(expected: string): R
}

declare module "vitest" {
  interface Assertion<T = any> extends FileMatchers<T> {}
  interface AsymmetricMatchersContaining extends FileMatchers {}
}

declare global {
  namespace jest {
    interface Matchers<R> extends FileMatchers<R> {}
  }
}

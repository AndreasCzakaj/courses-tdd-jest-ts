// make TypeScript (and your IDE) aware of the custom matchers of fileMatchers.ts
import "vitest"

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

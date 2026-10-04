// make TypeScript (and your IDE) aware of the matchers of the library `jest-extended`
import type CustomMatchers from "jest-extended"
import "vitest"

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining<T = any> extends CustomMatchers<T> {}
}

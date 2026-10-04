// make TypeScript (and your IDE) aware of the matchers of the library `jest-extended`
/// <reference types="jest-extended" />
import "vitest"

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers<any> {}
}

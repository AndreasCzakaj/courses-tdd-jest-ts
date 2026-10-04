// make TypeScript (and your IDE) aware of the custom matchers of dateMatchers.ts
import "vitest"

interface DateMatchers<R = unknown> {
  toBeInYear(expected: number): R
  /** @param expected 1-based, i.e. 5 is May (unlike `Date.getMonth()`) */
  toBeInMonth(expected: number): R
  toBeOnDayOfMonth(expected: number): R
}

declare module "vitest" {
  interface Assertion<T = any> extends DateMatchers<T> {}
  interface AsymmetricMatchersContaining extends DateMatchers {}
}

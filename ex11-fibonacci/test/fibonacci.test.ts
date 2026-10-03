import {
  Fibonacci,
  FibonacciLoopImpl,
  FibonacciRecursionImpl,
} from "@src/fibonacci"

// see https://www.wackerart.de/mathematik/big_numbers/fibonacci_numbers.html

// Reusable tests: every implementation of `Fibonacci` must pass them.
// Tests are "just functions" => wrap them in a function
export const fibonacciTest = (name: string, fibonacci: Fibonacci) =>
  describe(`fibonacci test using implementation ${name}`, () => {
    test.each`
      index | expected
      ${0}  | ${0}
      ${1}  | ${1}
      ${2}  | ${1}
      ${3}  | ${2}
      ${4}  | ${3}
      ${5}  | ${5}
      ${6}  | ${8}
      ${10} | ${55}
      ${19} | ${4_181}
      ${20} | ${6_765}
    `("should yield $expected for index $index", ({ index, expected }) => {
      const actual = fibonacci.calculate(index)
      expect(actual).toBe(expected)
    })

    test.each`
      index        | expected
      ${undefined} | ${"index must not be undefined"}
      ${null}      | ${"index must not be null"}
      ${-1}        | ${"index must not be negative"}
      ${47}        | ${"index must not be > 46"}
    `(
      "should throw error with message '$expected' for index $index",
      ({ index, expected }) => {
        const action = () => fibonacci.calculate(index)
        expect(action).toThrow(new Error(expected))
      }
    )
  })

fibonacciTest("loop impl", new FibonacciLoopImpl())
fibonacciTest("recursive impl", new FibonacciRecursionImpl())

describe("fibonacci test for large numbers", () => {
  // the other way to write a table: an array of arrays
  test.each([
    [30, 832_040],
    [40, 102_334_155],
    [46, 1_836_311_903],
  ])("loop impl should yield %i for index %i", (index, expected) => {
    expect(new FibonacciLoopImpl().calculate(index)).toBe(expected)
  })

  it.skip("should show which impl is slow af", () => {
    expect(new FibonacciRecursionImpl().calculate(46)).toBe(1_836_311_903)
  })
})

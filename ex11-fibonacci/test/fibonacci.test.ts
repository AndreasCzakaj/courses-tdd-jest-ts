import { Fibonacci } from "@src/fibonacci"

export const fibonacciTest = (name: string, fibonacci: Fibonacci) =>
  describe(`fibonacci test using implementation ${name}"`, () => {
    it.todo("should throw an Error for undefined index")

    it.todo("should throw an Error for negative index")

    it.todo("should yield 0 for 0")

    it.todo("should yield 1 for 1")

    it.todo("should yield 1 for 2")

    it.todo(
      "by now, you should be thoroughly annoyed about all the repetitions, I hope..."
    )

    it.todo(`
      index        | expected     | reason
      ${0}         | ${0}         | ${" 0 => 0"}
      ${1}         | ${1}         | ${" 1 => 1"}
      ${2}         | ${1}         | ${" 2 => 1"}
      ${3}         | ${2}         | ${" 3 => 2"}
      ${5}         | ${5}         | ${" 5 => 5"}
      ${6}         | ${8}         | ${" 6 => 8"}
      ${7}         | ${13}        | ${" 7 => 13"}
      ${19}        | ${4_181}     | ${" 19 => 4_181"}
      ${30}        | ${832_040}   | ${" 30 => 832_040"}
    `)

    it.todo("should throw an Error for null index")
    it.todo("should throw an Error for index > 0")

    it.skip("should show which impl is slow af", () => {
      expect(fibonacci.calc(46)).toBe(1_836_311_903)
    })
  })

describe("Fibonacci 1st implementation", () => {
  fibonacciTest("1st impl", new Fibonacci())
})

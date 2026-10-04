import { getPort2 } from "@src/cnn"

// the nested variant must behave exactly like `getPort`, see cnn.test.ts
describe("cnn.getPort2.test", () => {
  it.each`
    given        | expected | reason
    ${undefined} | ${8080}  | ${"Env param not set"}
    ${"xxx"}     | ${8080}  | ${"Env param not numeric"}
    ${1234}      | ${1234}  | ${"Env param used"}
  `(
    "should get the server port from env or use a default: $reason",
    ({ given, expected }) => {
      const actual = getPort2(() => given)
      expect(actual).toEqual(expected)
    }
  )
})

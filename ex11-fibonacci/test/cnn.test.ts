import { getPort } from "@src/cnn"

describe("cnn.test", () => {
  it.each`
    given        | expected | reason
    ${undefined} | ${8080}  | ${"Env param not set"}
    ${"xxx"}     | ${8080}  | ${"Env param not numeric"}
    ${1234}      | ${1234}  | ${"Env param used"}
  `(
    "should get the server port from env or use a default: $reason",
    ({ given, expected }) => {
      const actual = getPort(() => given)
      expect(actual).toEqual(expected)
    }
  )
})

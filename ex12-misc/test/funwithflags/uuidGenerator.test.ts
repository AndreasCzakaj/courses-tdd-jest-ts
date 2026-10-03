import {
  UuidGenerator,
  UuidGeneratorNaiveRandomImpl,
} from "@src/funwithflags/uuidGenerator"

describe("uuidGenerator.test", () => {
  const baseImpl: UuidGenerator = new UuidGeneratorNaiveRandomImpl()

  test.each([
    {
      uuidGenerator: baseImpl,
      expected: /^[a-f0-9]{32}$/,
      info: "lower case, no dashes",
    },
    // { uuidGenerator: new ???, expected: /^[A-F0-9]{32}$/, info: "upper case, no dashes" },
    // { uuidGenerator: new ???, expected: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/, info: "lower case, with dashes" },
    // { uuidGenerator: new ???, expected: /^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/, info: "upper case, with dashes" },
  ])(
    "should match pattern $expected for case: $info",
    ({ uuidGenerator, expected }) => {
      // when
      const actual = uuidGenerator.create()

      // then
      expect(actual).toMatch(expected)
    }
  )

  it("should use all chars", () => {
    const hexChars = [..."0123456789abcdef"]
    const foundChars = new Map<string, number>()

    const uuidGenerator = new UuidGeneratorNaiveRandomImpl()

    // yes, I'm looping. I need this because the process is random.
    for (let i = 0; i < 10; i++) {
      for (const char of uuidGenerator.create()) {
        foundChars.set(char, (foundChars.get(char) ?? 0) + 1)
      }
    }

    expect([...foundChars.keys()]).toIncludeSameMembers(hexChars)
    expect([...foundChars.values()]).toSatisfyAll((count: number) => count > 0)
  })
})

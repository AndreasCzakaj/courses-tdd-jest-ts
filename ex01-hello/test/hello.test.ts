import { hello, getValue, getList, getObject } from "@src/hello"

describe("covered test", () => {
  it("should yield 42 for the ultimate question", () => {
    // given
    const input =
      "What is the answer to the Ultimate Question of Life, the Universe, and Everything?"

    // when
    const actual = getValue(input)

    // then
    const expected = 42
    expect(actual).toEqual(expected)
    expect(actual).toBe(expected)
  })

  test("hello", () => {
    expect(hello).toEqual("friends")
    expect(hello).toBe("friends")
  })

  it("should match the list items", () => {
    // when
    const actual = getList()

    // then
    const expected = ["a", "b", "c"]
    expect(actual).toEqual(expected)
  })

  it("should yield the test user from `getObject`", () => {
    // when
    const actual = getObject()

    // then
    const expected = {
      firstName: "Joey",
      lastName: "Ramone",
    }
    // toEqual compares by value, toBe would compare identity (===)
    expect(actual).toEqual(expected)
    expect(actual).not.toBe(expected)
  })
})

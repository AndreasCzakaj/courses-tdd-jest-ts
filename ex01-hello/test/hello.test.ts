import { hello, getValue, getList, getObject } from "@src/hello"

describe("covered test", () => {
  test("hello", () => {
    expect(hello).toEqual("friends")
    expect(hello).toBe("friends")
  })

  it.skip("should yield the answer", () => {
    // given
    const input = "What's the meaning of it all?"

    // when
    const actual = getValue(input)

    // then
    const expected = 42
    expect(actual).toEqual(expected)
    expect(actual).toBe(expected)
  })

  it.skip("should match the list items", () => {
    // when
    const actual = getList()

    // then
    const expected = ["a", "b", "c"]
    expect(actual).toEqual(expected)
  })

  it.todo("should yield the test user from `getObject`")
})

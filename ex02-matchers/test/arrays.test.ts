import { getList } from "@src/arrays.js"

describe("arrays test", () => {
  it("test array with standard Jest matchers", () => {
    // when
    const actual = getList()

    // then
    const expected = ["a", "b", "c"]
    expect(actual).toEqual(expected)
    expect(actual.length).toEqual(3)
  })

  it("test array with extended matchers", () => {
    // when
    const actual = getList()

    // then
    expect(actual).toBeArrayOfSize(3)
  })

  it.todo(
    "should verify that getList yields an array that includes 'a' and 'c' "
  )

  it.todo(
    "should verify that getList yields an array that does not include 'd'"
  )

  it.todo("should verify that getList yields an array without duplicates")

  it.todo(
    "should verify that getList is precisely a, b, c but also loosely c, a, b"
  )

  it.todo("toBe vs. toEqual: same or equal?")
})

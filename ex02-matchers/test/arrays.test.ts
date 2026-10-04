import { getList } from "@src/arrays.js"

// matchers marked with (*) come from the library `jest-extended`

describe("arrays test", () => {
  it("test array with standard Jest matchers", () => {
    // when
    const actual = getList()

    // then
    const expected = ["a", "b", "c"]
    expect(actual).toEqual(expected)
    expect(actual).toHaveLength(3)
  })

  it("test array with extended matchers", () => {
    // when
    const actual = getList()

    // then
    expect(actual).toBeArrayOfSize(3) // (*)
  })

  it("should verify that getList yields an array that includes 'a' and 'c' ", () => {
    const actual = getList()

    expect(actual).toContain("a")
    expect(actual).toContain("c")
    // in 1 expression
    expect(actual).toEqual(expect.arrayContaining(["c", "a"]))
    expect(actual).toIncludeAllMembers(["c", "a"]) // (*)
  })

  it("should verify that getList yields an array that does not include 'd'", () => {
    expect(getList()).not.toContain("d")
  })

  it("should verify that getList yields an array without duplicates", () => {
    const actual = getList()

    expect(new Set(actual).size).toBe(actual.length)
  })

  it("should verify that getList is precisely a, b, c but also loosely c, a, b", () => {
    const actual = getList()

    // precisely: same items, same order
    expect(actual).toEqual(["a", "b", "c"])
    // loosely: same items, any order
    expect(actual).toIncludeSameMembers(["c", "a", "b"]) // (*)
    // contains any of
    expect(actual).toIncludeAnyMembers(["c", "d"]) // (*)
  })

  it("toBe vs. toEqual: same or equal?", () => {
    const actual = getList()

    // toEqual compares by value ...
    expect(actual).toEqual(["a", "b", "c"])
    // ... toBe compares identity (===), and this is another array
    expect(actual).not.toBe(["a", "b", "c"])
  })
})

// Same or equal? No exercise, but an illustration: all tests are GREEN.
//
// - `toBe` checks IDENTITY (`Object.is`): the very same instance
// - `toEqual` checks EQUALITY: same values, compared recursively
// - `toStrictEqual` is `toEqual`, but also checks the class and `undefined` fields

class Person {
  constructor(
    public id: number,
    public firstName: string,
  ) {}
}

describe("sameOrEqual.test", () => {
  it("primitives with the same type and value are same and equal", () => {
    // primitives are values, not objects: there is no identity
    expect(42).toBe(42)
    expect(42).toEqual(42)
    expect("Kim").toBe("Kim")
  })

  it("primitives of different types are neither same nor equal", () => {
    // JavaScript's `==` converts the types ...
    expect(42 == ("42" as unknown)).toBe(true)

    // ... the matchers never do
    expect(42).not.toBe("42")
    expect(42).not.toEqual("42")
  })

  it("objects with the same values are equal but not same", () => {
    const kim = { id: 24, firstName: "Kim" }
    const otherKim = { id: 24, firstName: "Kim" }

    expect(kim).toEqual(otherKim)
    expect(kim).not.toBe(otherKim)
  })

  it("an object is only the same as itself", () => {
    const kim = { id: 24, firstName: "Kim" }
    const alsoKim = kim

    // 2 variables, 1 instance
    expect(alsoKim).toBe(kim)

    // a copy is a new instance
    expect({ ...kim }).not.toBe(kim)
    expect({ ...kim }).toEqual(kim)
  })

  it("arrays are objects, too", () => {
    expect([1, 2, 3]).toEqual([1, 2, 3])
    expect([1, 2, 3]).not.toBe([1, 2, 3])

    // other order: not equal
    expect([1, 2, 3]).not.toEqual([3, 2, 1])
  })

  it("objects with different values are not equal", () => {
    const kim = { id: 24, firstName: "Kim" }
    const joey = { id: 24, firstName: "Joey" }

    expect(kim).not.toEqual(joey)
  })

  it("nested objects are compared recursively", () => {
    const kim = { id: 24, name: { first: "Kim", last: "Rawcliffe" } }
    const otherKim = { id: 24, name: { first: "Kim", last: "Rawcliffe" } }

    expect(kim).toEqual(otherKim)
    expect(kim.name).not.toBe(otherKim.name)
  })

  it("toEqual ignores the class, toStrictEqual does not", () => {
    const kim = new Person(24, "Kim")

    // same fields, same values ...
    expect(kim).toEqual({ id: 24, firstName: "Kim" })

    // ... but another class
    expect(kim).not.toStrictEqual({ id: 24, firstName: "Kim" })
    expect(kim).toStrictEqual(new Person(24, "Kim"))
  })

  it("toEqual ignores undefined fields, toStrictEqual does not", () => {
    const kim = { id: 24, firstName: "Kim", email: undefined }

    expect(kim).toEqual({ id: 24, firstName: "Kim" })
    expect(kim).not.toStrictEqual({ id: 24, firstName: "Kim" })
  })
})

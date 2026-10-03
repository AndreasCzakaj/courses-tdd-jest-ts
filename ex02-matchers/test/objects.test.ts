import { people } from "@src/objects"

// matchers marked with (*) come from the library `jest-extended`

describe("objects.test", () => {
  const person = people[23]

  test("init", () => {
    expect(people).toBeArrayOfSize(1000) // (*)
  })

  it("should verify that person at index 23 has firstName 'Kim'", () => {
    expect(person.firstName).toBe("Kim")
    expect(person).toHaveProperty("firstName", "Kim")
  })

  it("should verify that person at index 23 contains fields (keys) 'id' and 'ipAddress'", () => {
    expect(person).toHaveProperty("id")
    expect(person).toHaveProperty("ipAddress")
    // in 1 expression
    expect(person).toContainKeys(["id", "ipAddress"]) // (*)
  })

  it("should verify that person at index 23 contains values '55.247.214.105' and 'Rawcliffe'", () => {
    expect(Object.values(person)).toEqual(
      expect.arrayContaining(["55.247.214.105", "Rawcliffe"])
    )
    expect(person).toContainValues(["55.247.214.105", "Rawcliffe"]) // (*)
  })

  it("should verify that person at index 23 equals the expected person, in one go", () => {
    const expected = {
      id: 24,
      firstName: "Kim",
      lastName: "Rawcliffe",
      email: "krawcliffen@seesaa.net",
      ipAddress: "55.247.214.105",
    }

    // toEqual compares by value (deep) ...
    expect(person).toEqual(expected)
    // ... toBe compares identity (===)
    expect(person).not.toBe(expected)
  })

  it("should verify that person at index 23 matches partially", () => {
    // "is a superset of"
    expect(person).toMatchObject({
      lastName: "Rawcliffe",
      email: "krawcliffen@seesaa.net",
    })
    // alternative: matchers inside the expected object
    expect(person).toEqual(
      expect.objectContaining({ firstName: expect.stringMatching(/^K/) })
    )
  })

  it("should verify that an action throws an Error with message 'oops'", () => {
    const action = () => {
      throw new Error("oops")
    }

    // pass the function, do not call it!
    expect(action).toThrow("oops")
    expect(action).toThrow(new Error("oops"))
  })
})

import { myemail, mycolor } from "@src/strings"

// matchers marked with (*) come from the library `jest-extended`

describe("strings.test", () => {
  it("should verify that `myemail` is a string", () => {
    expect(typeof myemail).toBe("string")
    expect(myemail).toEqual(expect.any(String))
    expect(myemail).toBeString() // (*)
  })

  it("should verify that `myemail` starts with andreas", () => {
    expect(myemail).toMatch(/^andreas/)
    // better: says what it does, and gives a helpful message when it fails
    expect(myemail).toStartWith("andreas") // (*)
  })

  it("should verify that `myemail` ends with .eu", () => {
    expect(myemail).toMatch(/\.eu$/)
    expect(myemail).toEndWith(".eu") // (*)
  })

  it("should verify that `myemail` does NOT end with .com", () => {
    // every matcher can be negated with `.not`
    expect(myemail).not.toMatch(/\.com$/)
    expect(myemail).not.toEndWith(".com") // (*)
  })

  it("should verify that `myemail` includes 'binary'", () => {
    expect(myemail).toContain("binary")
    expect(myemail).toInclude("binary") // (*)
  })

  it("should verify that `myemail` includes both 'andreas' and 'stars' (using only 1 matcher)", () => {
    expect(myemail).toIncludeMultiple(["andreas", "stars"]) // (*)
  })

  it("should verify that `myemail` matches the regex `/[a-z.-]{1,}@[a-z-]{1,}\\.[a-z]{2,}/`", () => {
    expect(myemail).toMatch(/[a-z.-]{1,}@[a-z-]{1,}\.[a-z]{2,}/)
  })

  it("should verify that `myemail` does NOT match the regex `/[a-z.-]{1,}@[a-z-]{1,}\\.[a-z]{3,}/`", () => {
    expect(myemail).not.toMatch(/[a-z.-]{1,}@[a-z-]{1,}\.[a-z]{3,}/)
  })

  it("should verify that `mycolor` is hexadecimal", () => {
    expect(mycolor).toMatch(/^#[0-9a-f]{3}([0-9a-f]{3})?$/i)
    expect(mycolor).toBeHexadecimal() // (*)
  })

  it("should verify all of the above in 1 expression", () => {
    // matchers can be combined with `expect.stringMatching` etc. ...
    expect(myemail).toEqual(expect.stringMatching(/^andreas.*binary.*\.eu$/))
    // ... or with `toSatisfy` (*) and a plain function
    expect(myemail).toSatisfy(
      (email: string) =>
        email.startsWith("andreas") &&
        email.endsWith(".eu") &&
        !email.endsWith(".com") &&
        email.includes("binary")
    )
  })

  it("should not exit at the 1st failure: soft assertions (Vitest only)", () => {
    // `expect.soft` collects the failures and reports all of them at the end
    expect.soft(myemail).toStartWith("andreas")
    expect.soft(myemail).toEndWith(".eu")
    expect.soft(myemail).not.toEndWith(".com")
    expect.soft(myemail).toInclude("binary")
  })
})

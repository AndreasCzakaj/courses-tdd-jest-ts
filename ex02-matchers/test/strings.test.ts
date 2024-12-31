import { myemail, mycolor } from "@src/strings"

describe("strings.test", () => {
  it.todo("should verify that `myemail` is a string")

  it.todo("should verify that `myemail` starts with andreas")

  it.todo("should verify that `myemail` ends with .eu")

  it.todo("should verify that `myemail` does NOT end with .com")

  it.todo("should verify that `myemail` includes 'binary'")
  it.todo(
    "should verify that `myemail` includes both 'andreas' and 'stars' (using only 1 matcher)"
  )

  it.todo(
    "should verify that `myemail` matches the regex `/[a-z.-]{1,}@[a-z-]{1,}\\.[a-z]{2,}/`"
  )

  it.todo(
    "should verify that `myemail` does NOT match the regex `/[a-z.-]{1,}@[a-z-]{1,}\\.[a-z]{3,}/`"
  )

  it.todo("should verify that `mycolor` is hexadecimal")
})

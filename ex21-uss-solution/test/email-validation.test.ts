import { validateEmail } from "../src/email-validation"
import { ValidationError } from "../src/validation"

describe("validateEmail", () => {
  test.each`
    given
    ${undefined}
    ${null}
    ${""}
    ${"   "}
    ${"test"}
    ${"test@"}
    ${"test@email"}
    ${"test@email."}
    ${"test@email.d"}
    ${"@email.de"}
  `("Validate email should fail", ({ given }) => {
    const actual = () => validateEmail(given)
    expect(actual).toThrow(new ValidationError(["email"]))
  })

  test.each`
    given
    ${"test@email.de"}
  `("Validate email should pass", ({ given }) => {
    const actual = () => validateEmail(given)
    expect(actual).not.toThrow(new ValidationError(["email"]))
  })
})

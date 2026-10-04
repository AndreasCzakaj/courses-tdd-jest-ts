import {
  validateCredentials,
  validatePassword,
  validateUsername,
  ValidationError,
} from "@src/uss/validation"
import {
  createValidCredentials,
  createValidCredentialsNotVerifiedAccount,
  createValidCredentialsUnknownUser,
  VALID_BUT_WRONG_PASSWORD,
  VALID_PASSWORD,
} from "./test-utils"

describe("validation.test", () => {
  test.each`
    given                      | reason
    ${undefined}               | ${"undefined"}
    ${null}                    | ${"null"}
    ${""}                      | ${"empty"}
    ${"        "}              | ${"empty whitespace"}
    ${12345678}                | ${"not a string"}
    ${{ $ne: "" }}             | ${"an object (NoSQL injection)"}
    ${"1234567"}               | ${"too short"}
    ${"1234567 "}              | ${"too short with padding"}
    ${"123456789012345678901"} | ${"too long"}
    ${"1234 6789"}             | ${"invalid char: blank"}
    ${"1234.6789"}             | ${"invalid char: allowed in passwords only"}
    ${"12345678\n"}            | ${"trailing newline"}
  `("Validate username should fail: $reason", ({ given }) => {
    const actual = () => validateUsername(given)
    expect(actual).toThrow(new ValidationError("username"))
  })

  test.each`
    given                                           | reason
    ${"12345678"}                                   | ${"min size"}
    ${"12345678901234567890"}                       | ${"max size"}
    ${"aZ09-_aZ"}                                   | ${"all allowed chars"}
    ${createValidCredentials().username}            | ${"createValidCredentials"}
    ${createValidCredentialsUnknownUser().username} | ${"createValidCredentialsUnknownUser"}
  `("Validate username should pass: $reason", ({ given }) => {
    const actual = () => validateUsername(given)
    expect(actual).not.toThrow()
  })

  test.each`
    given                                  | reason
    ${undefined}                           | ${"undefined"}
    ${null}                                | ${"null"}
    ${""}                                  | ${"empty"}
    ${"            "}                      | ${"empty whitespace"}
    ${123456789012}                        | ${"not a string"}
    ${"12345678901"}                       | ${"too short"}
    ${"12345678901 "}                      | ${"too short with padding"}
    ${"123456789012345678901234567890123"} | ${"too long"}
    ${"123456 89012"}                      | ${"invalid char: blank"}
    ${"123456!89012"}                      | ${"invalid char: !"}
  `("Validate password should fail: $reason", ({ given }) => {
    const actual = () => validatePassword(given)
    expect(actual).toThrow(new ValidationError("password"))
  })

  test.each`
    given                                 | reason
    ${"123456789012"}                     | ${"min size"}
    ${"12345678901234567890123456789012"} | ${"max size"}
    ${"aZ09-_.,+aZ0"}                     | ${"all allowed chars"}
    ${VALID_PASSWORD}                     | ${"VALID_PASSWORD"}
    ${VALID_BUT_WRONG_PASSWORD}           | ${"VALID_BUT_WRONG_PASSWORD"}
  `("Validate password should pass: $reason", ({ given }) => {
    const actual = () => validatePassword(given)
    expect(actual).not.toThrow()
  })

  test.each`
    given                                               | field         | reason
    ${undefined}                                        | ${"username"} | ${"undefined"}
    ${null}                                             | ${"username"} | ${"null"}
    ${{}}                                               | ${"username"} | ${"empty object"}
    ${"alice_verified"}                                 | ${"username"} | ${"not an object"}
    ${{ ...createValidCredentials(), username: "al" }}  | ${"username"} | ${"invalid username"}
    ${{ ...createValidCredentials(), password: "pwd" }} | ${"password"} | ${"invalid password"}
    ${{ username: "al", password: "pwd" }}              | ${"username"} | ${"both invalid: reports the 1st one"}
  `("Validate credentials should fail: $reason", ({ given, field }) => {
    const actual = () => validateCredentials(given)
    expect(actual).toThrow(new ValidationError(field))
  })

  test.each`
    given                                         | reason
    ${createValidCredentials()}                   | ${"createValidCredentials"}
    ${createValidCredentialsNotVerifiedAccount()} | ${"createValidCredentialsNotVerifiedAccount"}
    ${createValidCredentialsUnknownUser()}        | ${"createValidCredentialsUnknownUser"}
  `("Validate credentials should pass: $reason", ({ given }) => {
    const actual = () => validateCredentials(given)
    expect(actual).not.toThrow()
  })

  test("the error should name the invalid field", () => {
    const error = new ValidationError("username")
    expect(error.field).toBe("username")
    expect(error.message).toBe("invalid: username")
  })
})

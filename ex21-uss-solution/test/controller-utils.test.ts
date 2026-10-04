import { calcHttpErrorCode } from "../src/controller-utils"
import { DaoError } from "../src/UserDao"
import { ServerError, UserError } from "../src/user-self-service"
import { ValidationError } from "../src/validation"

describe("controller-utils.test", () => {
  test.each`
    error                                | expected | reason
    ${new ValidationError(["username"])} | ${400}   | ${"invalid input is the client's fault"}
    ${new UserError("oops")}             | ${400}   | ${"a user error is the client's fault"}
    ${new ServerError("oops")}           | ${500}   | ${"a server error is our fault"}
    ${new DaoError("oops")}              | ${500}   | ${"any other error is our fault"}
    ${"not even an Error"}               | ${500}   | ${"anything else is our fault"}
  `("should map to HTTP status $expected: $reason", ({ error, expected }) => {
    expect(calcHttpErrorCode(error)).toBe(expected)
  })
})

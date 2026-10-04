import { DaoError } from "@src/uss/AccountDao"
import {
  calcErrorMessage,
  calcHttpErrorCode,
  MESSAGE_SERVER_ERROR,
} from "@src/uss/controller-utils"
import {
  AccountNotVerifiedError,
  AuthenticationError,
  ServerError,
} from "@src/uss/user-self-service"
import { ValidationError } from "@src/uss/validation"

describe("controller-utils.test", () => {
  test.each`
    error                              | expected | reason
    ${new ValidationError("username")} | ${400}   | ${"invalid input is the client's fault"}
    ${new AuthenticationError()}       | ${401}   | ${"unknown username or wrong password"}
    ${new AccountNotVerifiedError()}   | ${400}   | ${"account not verified"}
    ${new ServerError("oops")}         | ${500}   | ${"a server error is our fault"}
    ${new DaoError("oops")}            | ${500}   | ${"any other error is our fault"}
    ${"not even an Error"}             | ${500}   | ${"anything else is our fault"}
  `("should map to HTTP status $expected: $reason", ({ error, expected }) => {
    expect(calcHttpErrorCode(error)).toBe(expected)
  })

  test.each`
    error                              | expected                                | reason
    ${new ValidationError("username")} | ${"invalid: username"}                  | ${"names the invalid field"}
    ${new AuthenticationError()}       | ${"unknown username or wrong password"} | ${"does not reveal which one"}
    ${new AccountNotVerifiedError()}   | ${"account not verified"}               | ${"account not verified"}
    ${new ServerError("db is down")}   | ${MESSAGE_SERVER_ERROR}                 | ${"hides the server's internals"}
    ${new DaoError("Mongo Error")}     | ${MESSAGE_SERVER_ERROR}                 | ${"hides the server's internals"}
    ${"not even an Error"}             | ${MESSAGE_SERVER_ERROR}                 | ${"hides the server's internals"}
  `("should map to message '$expected': $reason", ({ error, expected }) => {
    expect(calcErrorMessage(error)).toBe(expected)
  })
})

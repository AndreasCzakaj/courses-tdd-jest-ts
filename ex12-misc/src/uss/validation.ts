import { Credentials } from "./account"

export class ValidationError extends Error {
  constructor(public readonly field: string) {
    super(`invalid: ${field}`)
  }
}

// The validation functions are "assertion functions":
// after the call, TypeScript knows that the value is valid.

const REGEX_USERNAME = /^[a-zA-Z0-9\-_]{8,20}$/
export function validateUsername(
  username: unknown,
): asserts username is string {
  if (!matches(username, REGEX_USERNAME)) {
    throw new ValidationError("username")
  }
}

const REGEX_PASSWORD = /^[a-zA-Z0-9\-_.,+]{12,32}$/
export function validatePassword(
  password: unknown,
): asserts password is string {
  if (!matches(password, REGEX_PASSWORD)) {
    throw new ValidationError("password")
  }
}

export function validateCredentials(
  credentials: unknown,
): asserts credentials is Credentials {
  // the input is untrusted: it may be anything, e.g. the body of an HTTP request
  const { username, password } = (credentials ?? {}) as Partial<Credentials>
  validateUsername(username)
  validatePassword(password)
}

function matches(value: unknown, regex: RegExp): value is string {
  return typeof value === "string" && regex.test(value)
}

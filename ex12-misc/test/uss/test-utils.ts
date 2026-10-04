import { Account, Credentials } from "@src/uss/account"
import { AccountDaoDictionaryImpl } from "@src/uss/AccountDao"
import { HttpResponse } from "@src/uss/http"
import { hashPassword } from "@src/uss/password"
import { UserSelfService } from "@src/uss/user-self-service"

export const VALID_PASSWORD = "Correct-Horse_42"
export const VALID_BUT_WRONG_PASSWORD = "Battery.Staple+7"

// hashing is slow on purpose => once for all tests
const VALID_PASSWORD_HASH = hashPassword(VALID_PASSWORD)

// The "creators" return valid objects.
// A test then breaks them in 1 place, so it tests for 1 error.

export function createVerifiedAccount(): Account {
  return {
    id: "0b0e7a4c-8d2f-4c3a-9a51-6f1f3c1d2e01",
    username: "alice_verified",
    passwordHash: VALID_PASSWORD_HASH,
    email: "alice@example.com",
    tcAccepted: new Date("2026-10-01T08:00:00Z"),
    status: "verified",
  }
}

export function createNotVerifiedAccount(): Account {
  return {
    ...createVerifiedAccount(),
    id: "0b0e7a4c-8d2f-4c3a-9a51-6f1f3c1d2e02",
    username: "bob_not_verified",
    email: "bob@example.com",
    status: "new",
  }
}

export function createValidCredentials(): Credentials {
  return {
    username: createVerifiedAccount().username,
    password: VALID_PASSWORD,
  }
}

export function createValidCredentialsNotVerifiedAccount(): Credentials {
  return {
    username: createNotVerifiedAccount().username,
    password: VALID_PASSWORD,
  }
}

export function createValidCredentialsUnknownUser(): Credentials {
  return {
    username: "idonotexist",
    password: VALID_PASSWORD,
  }
}

export function createUserSelfServiceWithWorkingDeps(): UserSelfService {
  const accountDao = new AccountDaoDictionaryImpl([
    createVerifiedAccount(),
    createNotVerifiedAccount(),
  ])
  return new UserSelfService(accountDao)
}

type ResponseCollector = {
  status?: number
  content?: unknown
  sent: boolean
}

/** Records what a controller does with the response */
export class ResponseFake implements HttpResponse {
  collector: ResponseCollector = {
    sent: false,
  }

  status(v: number): this {
    this.collector.status = v
    return this
  }
  json(v?: unknown): this {
    this.collector.content = v
    this.collector.sent = true
    return this
  }
}

export function createResponseFake(): ResponseFake {
  return new ResponseFake()
}

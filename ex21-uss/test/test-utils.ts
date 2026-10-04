import { DaoDictionaryImpl } from "../src/Dao"
import { HttpResponse } from "../src/http"
import { ProviderRecordImpl } from "../src/Provider"
import { Credentials, PersonOdata, User } from "../src/user-self-service"
import russellwhyte from "./user-russellwhyte.json"

export { russellwhyte }

// ---------- building blocks for a UserSelfService with working dependencies

/** a fake database that contains 1 user, see `createValidCredentialsExistingUser` */
export function createUserDaoWithExistingUser(): DaoDictionaryImpl<User> {
  const credentials = createValidCredentialsExistingUser()
  return new DaoDictionaryImpl<User>({
    [credentials.username]: { ...credentials, status: "new", emails: [] },
  })
}

/** a fake remote system that contains 1 person, see `createValidCredentialsNewUser` */
export function createPersonOdataProviderWithNewUser(): ProviderRecordImpl<PersonOdata> {
  const newUser = createValidCredentialsNewUser()
  return new ProviderRecordImpl<PersonOdata>({
    [newUser.username]: russellwhyte,
  })
}

// ---------- test data

export const validButWrongPassword = "wrongpasswd"

export function createValidCredentialsExistingUser(): Credentials {
  return {
    username: "ialreadyexist",
    password: "pa55w0rd",
  }
}

export function createValidCredentialsNewUser(): Credentials {
  return {
    username: "russellwhyte",
    password: "otherpasswd",
  }
}

export function createValidCredentialsNewUserUnknownInRemoteSystem(): Credentials {
  return {
    username: "idonotexist",
    password: "somepasswd",
  }
}

// ---------- a fake for the HTTP response

export function createResponseFake(): ResponseFake {
  return new ResponseFake()
}

type ResponseCollector = {
  contentType?: string
  content?: unknown
  status?: number
  sent: boolean
}

/** Records what a controller does with the response */
export class ResponseFake implements HttpResponse {
  collector: ResponseCollector = {
    contentType: undefined,
    content: undefined,
    status: undefined,
    sent: false,
  }

  contentType(v: string): this {
    this.collector.contentType = v
    return this
  }

  send(v?: unknown): this {
    this.collector.content = v
    this.collector.sent = true
    return this
  }

  status(v: number): this {
    this.collector.status = v
    return this
  }
}

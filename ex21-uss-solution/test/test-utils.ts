import {
  PersonOdata,
  PersonOdataProviderDictionaryImpl,
} from "../src/PersonOdataProvider"
import { HttpResponse } from "../src/http"
import { Credentials, User, UserSelfService } from "../src/user-self-service"
import { UserDaoDictionaryImpl } from "../src/UserDao"
import russellwhyte from "./user-russellwhyte.json"

export function createUserSelfServiceWithWorkingDeps(): UserSelfService {
  const credentials = createValidCredentialsExistingUser()
  const repo: Record<string, User> = {}
  repo[credentials.username] = { ...credentials, status: "new", emails: [] }
  const userDao = new UserDaoDictionaryImpl(repo)

  const newUser = createValidCredentialsNewUser()
  const odataRepo: Record<string, PersonOdata> = {}
  odataRepo[newUser.username] = russellwhyte
  const personOdataProvider = new PersonOdataProviderDictionaryImpl(odataRepo)

  return new UserSelfService(userDao, personOdataProvider)
}

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

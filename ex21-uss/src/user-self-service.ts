export type Credentials = {
  username: string
  password: string
}

export type SignUpData = Credentials

export type UserStatus = "new"

export type User = {
  username: string
  password: string
  status: UserStatus
  firstName?: string
  lastName?: string
  emails: string[]
}

/** The fields of a person in the remote OData service that we use */
export type PersonOdata = {
  FirstName: string
  LastName: string
  Emails: string[]
}

export class UserSession {}

export class UserSelfServiceError extends Error {}

export class UserError extends UserSelfServiceError {}

export class ServerError extends UserSelfServiceError {}

export class UserSelfService {
  // ToDo, test first: see test/user-self-service.test.ts
  // - validation
  // - login
  // - signUp
}

import { PersonOdata, PersonOdataProvider } from "./PersonOdataProvider"
import { UserDao } from "./UserDao"
import { ValidationError } from "./validation"

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

export class UserSession {}

export class UserSelfServiceError extends Error {}

export class UserError extends UserSelfServiceError {}

export class ServerError extends UserSelfServiceError {}

export class UserSelfService {
  constructor(
    public userDao: UserDao,
    public personOdataProvider: PersonOdataProvider
  ) {}

  async login(credentials?: Credentials | null): Promise<UserSession> {
    validateCredentials(credentials)
    const user = await this.getUserFromDao(credentials.username)
    if (user?.password === credentials.password) {
      return new UserSession()
    }
    throw new UserError("Unknown username or wrong password")
  }

  async signUp(signUpData?: SignUpData | null): Promise<User> {
    validateSignUpData(signUpData)

    const existingUser = await this.getUserFromDao(signUpData.username)
    if (existingUser) {
      throw new UserError("username already taken")
    }

    const newUser: User = {
      username: signUpData.username,
      password: signUpData.password,
      status: "new",
      emails: [],
    }

    await this.appendRemoteData(newUser)

    return this.userDao.save(signUpData.username, newUser)
  }

  async appendRemoteData(newUser: User): Promise<void> {
    const personOdata = await this.getRemotePersonData(newUser.username)
    if (personOdata) {
      newUser.emails = personOdata.Emails
      newUser.firstName = personOdata.FirstName
      newUser.lastName = personOdata.LastName
    } else {
      throw new UserError("user unknown in remote system")
    }
  }

  async getUserFromDao(username: string): Promise<User | undefined> {
    try {
      return await this.userDao.get(username)
    } catch {
      throw new ServerError("Database not available. Try later.")
    }
  }

  async getRemotePersonData(username: string): Promise<PersonOdata | undefined> {
    try {
      return await this.personOdataProvider.get(username)
    } catch {
      throw new ServerError("Remote Service not available. Try later.")
    }
  }
}

// The validation functions are "assertion functions":
// after the call, TypeScript knows that the value is valid.

const REGEX_PASSWORD = /^[a-zA-Z0-9.\-_]{8,12}$/
export function validatePassword(
  password?: string | null
): asserts password is string {
  if (password && REGEX_PASSWORD.test(password)) {
    return
  }
  throw new ValidationError(["password"])
}

const REGEX_USERNAME = /^[a-z0-9]{8,16}$/
export function validateUsername(
  username?: string | null
): asserts username is string {
  if (username && REGEX_USERNAME.test(username)) {
    return
  }
  throw new ValidationError(["username"])
}

export function validateCredentials(
  credentials?: Partial<Credentials> | null
): asserts credentials is Credentials {
  if (credentials) {
    validateUsername(credentials.username)
    validatePassword(credentials.password)
    return
  }
  throw new ValidationError(["username", "password"])
}

export function validateSignUpData(
  signUpData?: Partial<SignUpData> | null
): asserts signUpData is SignUpData {
  if (signUpData) {
    validateUsername(signUpData.username)
    validatePassword(signUpData.password)
    return
  }
  throw new ValidationError(["username", "password"])
}

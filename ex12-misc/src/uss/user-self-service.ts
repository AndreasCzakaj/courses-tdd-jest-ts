import { Account, UserSession } from "./account"
import { AccountDao } from "./AccountDao"
import { verifyPassword } from "./password"
import { validateCredentials } from "./validation"

export class UserSelfServiceError extends Error {}

// the SAME error for an unknown username and for a wrong password:
// the response must not reveal which usernames exist
export class AuthenticationError extends UserSelfServiceError {
  constructor() {
    super("unknown username or wrong password")
  }
}

export class AccountNotVerifiedError extends UserSelfServiceError {
  constructor() {
    super("account not verified")
  }
}

export class ServerError extends UserSelfServiceError {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
  }
}

export class UserSelfService {
  constructor(public accountDao: AccountDao) {}

  async login(credentials: unknown): Promise<UserSession> {
    validateCredentials(credentials)

    const account = await this.findAccount(credentials.username)
    if (
      !account ||
      !verifyPassword(credentials.password, account.passwordHash)
    ) {
      throw new AuthenticationError()
    }
    if (account.status !== "verified") {
      throw new AccountNotVerifiedError()
    }

    return {
      accountId: account.id,
      username: account.username,
      email: account.email,
    }
  }

  private async findAccount(username: string): Promise<Account | undefined> {
    try {
      return await this.accountDao.findByUsername(username)
    } catch (e) {
      throw new ServerError("Database not available. Try later.", e)
    }
  }
}

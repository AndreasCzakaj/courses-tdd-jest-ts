import { Account } from "./account"

// an interface on purpose: the service is isolated from the database,
// and the implementations are interchangeable
export interface AccountDao {
  findByUsername(username: string): Promise<Account | undefined>
}

export class DaoError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
  }
}

export class AccountDaoDictionaryImpl implements AccountDao {
  private readonly repo: Record<string, Account> = {}

  constructor(accounts: Account[] = []) {
    accounts.forEach((account) => (this.repo[account.username] = account))
  }

  async findByUsername(username: string): Promise<Account | undefined> {
    return this.repo[username]
  }
}

export class AccountDaoThrowingImpl implements AccountDao {
  async findByUsername(_username: string): Promise<Account | undefined> {
    throw new DaoError("findByUsername: oops")
  }
}

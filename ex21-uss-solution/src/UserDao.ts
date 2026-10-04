import { User } from "./user-self-service"

// an interface on purpose: the service is isolated from the database,
// and the implementations are interchangeable
export interface UserDao {
  get(identifier: string): Promise<User | undefined>

  save(identifier: string, user: User): Promise<User>
}

export class DaoError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
  }
}

export class UserDaoDictionaryImpl implements UserDao {
  constructor(private readonly repo: Record<string, User> = {}) {}

  async get(identifier: string): Promise<User | undefined> {
    return this.repo[identifier]
  }

  async save(identifier: string, user: User): Promise<User> {
    this.repo[identifier] = user
    return user
  }
}

export class UserDaoThrowingImpl implements UserDao {
  async get(_identifier: string): Promise<User | undefined> {
    throw new DaoError("get: oops")
  }

  async save(_identifier: string, _user: User): Promise<User> {
    throw new DaoError("save: oops")
  }
}

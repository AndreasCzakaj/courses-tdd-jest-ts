// A generic interface on purpose: the service is isolated from the database,
// and the implementations are interchangeable.
// If needed, there can be specific implementations, see `UserDaoMongoImpl`.
export interface Dao<T> {
  get(identifier: string): Promise<T | null>

  //save(identifier: string, object: T): Promise<T>
}

export class DaoError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
  }
}

export class DaoDictionaryImpl<T> implements Dao<T> {
  constructor(private readonly repo: Record<string, T> = {}) {}

  async get(identifier: string): Promise<T | null> {
    return this.repo[identifier] || null
  }

  async save(identifier: string, object: T): Promise<T> {
    this.repo[identifier] = object
    return object
  }
}

export class DaoThrowingImpl<T> implements Dao<T> {
  async get(_identifier: string): Promise<T | null> {
    throw new DaoError("get: oops")
  }

  async save(_identifier: string, _object: T): Promise<T> {
    throw new DaoError("save: oops")
  }
}

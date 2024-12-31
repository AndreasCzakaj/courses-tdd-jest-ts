export interface Dao<T> {
  get(identifier: string): Promise<T | null>

  //save(identifier: string, object: T): Promise<T>
}

export class DaoError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause })
  }
}

export class DaoDictionaryImpl<T> implements Dao<T> {
  constructor(private repo: Record<string, T> = {}) {}

  async get(identifier): Promise<T | null> {
    return this.repo[identifier] || null
  }

  async save(identifier: string, object: T): Promise<T> {
    this.repo[identifier] = object
    return object
  }
}

export class DaoThrowingImpl<T> implements Dao<T> {
  constructor() {}

  async get(identifier): Promise<T | null> {
    throw new DaoError("get: oops")
  }

  async save(identifier: string, object: T): Promise<T> {
    throw new DaoError("save: oops")
  }
}

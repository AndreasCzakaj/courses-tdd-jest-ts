// A generic interface on purpose: the service is isolated from the remote system,
// and the implementations are interchangeable.
export interface Provider<T> {
  get(identifier: string): Promise<T | undefined>
}

export class ProviderError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
  }
}

export class ProviderRecordImpl<T> implements Provider<T> {
  constructor(private readonly repo: Record<string, T> = {}) {}

  async get(identifier: string): Promise<T | undefined> {
    return this.repo[identifier]
  }
}

export class ProviderThrowingImpl<T> implements Provider<T> {
  async get(_identifier: string): Promise<T | undefined> {
    throw new ProviderError("oops")
  }
}

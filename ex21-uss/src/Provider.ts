export interface Provider<T> {
  get(identifier: string): Promise<T>
}

export class ProviderError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause })
  }
}

export class ProviderRecordImpl<T> implements Provider<T> {
  constructor(private repo: Record<string, T> = {}) {}

  async get(identifier: string): Promise<T> {
    return this.repo[identifier]
  }
}

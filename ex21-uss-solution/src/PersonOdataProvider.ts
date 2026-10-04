/** The fields of a person in the OData service that we use */
export type PersonOdata = {
  FirstName: string
  LastName: string
  Emails: string[]
}

// an interface on purpose: the service is isolated from the remote system,
// and the implementations are interchangeable
export interface PersonOdataProvider {
  get(identifier: string): Promise<PersonOdata | undefined>
}

export class ProviderError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
  }
}

export class PersonOdataProviderDictionaryImpl implements PersonOdataProvider {
  constructor(private readonly repo: Record<string, PersonOdata> = {}) {}

  async get(identifier: string): Promise<PersonOdata | undefined> {
    return this.repo[identifier]
  }
}

export class PersonOdataProviderThrowingImpl implements PersonOdataProvider {
  async get(_identifier: string): Promise<PersonOdata | undefined> {
    throw new ProviderError("oops")
  }
}

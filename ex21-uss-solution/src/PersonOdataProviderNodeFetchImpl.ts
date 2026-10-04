import fetch, { Response } from "node-fetch"
import {
  PersonOdata,
  PersonOdataProvider,
  ProviderError,
} from "./PersonOdataProvider"

export type PersonOdataProviderOptions = {
  /** the root URL of the OData service, w/out the entity set `People` */
  baseUrl: string
}

export class PersonOdataProviderNodeFetchImpl implements PersonOdataProvider {
  constructor(private readonly opts: PersonOdataProviderOptions) {}

  async get(identifier: string): Promise<PersonOdata | undefined> {
    let resp: Response
    try {
      const url = this.calcUrl(identifier)
      resp = await fetch(url)
    } catch (nodeFetchError) {
      //console.error("nodeFetchError", nodeFetchError)
      throw new ProviderError("IO Error", nodeFetchError)
    }

    const status = resp.status
    const statusText = resp.statusText
    if (status === 200) {
      return (await resp.json()) as PersonOdata
    }
    if (status === 404) {
      return undefined
    }
    throw new ProviderError(`HTTP Error: ${status} - ${statusText}`)
  }

  calcUrl(identifier: string): string {
    return `${this.opts.baseUrl}/People/${identifier}`
  }
}

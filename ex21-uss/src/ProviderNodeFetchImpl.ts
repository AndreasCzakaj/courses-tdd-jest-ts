import fetch, { Response } from "node-fetch"
import { Provider, ProviderError } from "./Provider"

export type ProviderOptions = {
  /** the URL of the collection, e.g. `https://.../People` */
  baseUrl: string
}

export class ProviderNodeFetchImpl<T> implements Provider<T> {
  constructor(private readonly opts: ProviderOptions) {}

  async get(identifier: string): Promise<T | undefined> {
    const resp = await this.getResponse(identifier)

    const status = resp.status
    const statusText = resp.statusText
    if (status === 200) {
      try {
        return (await resp.json()) as T
      } catch (e) {
        throw new ProviderError(`JSON Error`, e)
      }
    }
    if (status === 404) {
      return undefined
    }
    throw new ProviderError(`HTTP Error: ${status} - ${statusText}`)
  }

  private async getResponse(identifier: string): Promise<Response> {
    try {
      const url = this.calcUrl(identifier)
      return await fetch(url)
    } catch (nodeFetchError) {
      //console.error("nodeFetchError", nodeFetchError)
      throw new ProviderError("IO Error", nodeFetchError)
    }
  }

  calcUrl(identifier: string): string {
    return `${this.opts.baseUrl}/${identifier}`
  }
}

import { Provider, ProviderError } from "./Provider"
import fetch from "node-fetch"

export class ProviderNodeFetchImpl<T> implements Provider<T> {
  constructor(private opts) {}

  async get(identifier: string) {
    const resp = await this.getResponse(identifier)

    const status = resp.status
    const statusText = resp.statusText
    if (status === 200) {
      try {
        const json = await resp.json()
        return JSON.parse(json as string)
      } catch (e) {
        throw new ProviderError(`JSON Error`, e)
      }
    }
    if (status === 404) {
      return undefined
    }
    throw new ProviderError(`HTTP Error: ${status} - ${statusText}`)
  }

  private async getResponse(identifier: string) {
    try {
      const url = this.calcUrl(identifier)
      return await fetch(url)
    } catch (nodeFetchError) {
      //console.error("nodeFetchError", nodeFetchError)
      throw new ProviderError("IO Error", nodeFetchError)
    }
  }

  calcUrl(identifier: string) {
    return `${this.opts.baseUrl}/${identifier}`
  }
}

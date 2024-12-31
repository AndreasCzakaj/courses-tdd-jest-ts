import { ProviderError } from "../src/Provider"
import { ProviderNodeFetchImpl } from "../src/ProviderNodeFetchImpl"
import { runServer } from "./http-server.js"

describe("PersonOdataNodeFetchImpl", () => {
  let provider
  const port = 3001

  beforeEach(async () => {
    provider = new ProviderNodeFetchImpl({
      baseUrl: `http://localhost:${port}/People`,
    })
  })

  describe("with server", () => {
    let server

    beforeAll(async () => {
      server = await runServer(port)
    })

    afterAll(() => {
      server?.close()
    })

    test("get OK 123", async () => {
      // given
      const given = "123"

      // when
      const actual = await provider.get(given)

      // then
      expect(actual).toEqual({
        FirstName: "fn",
        LastName: "ln",
        Emails: ["abc@def.com"],
      })
    })

    test("get 404", async () => {
      // given
      const given = "404"

      // when
      const actual = await provider.get(given)

      // then
      expect(actual).toBe(undefined)
    })

    test("get 500", async () => {
      // given
      const given = "500"

      // when
      const actual = async () => await provider.get(given)

      // then
      await expect(actual).rejects.toThrow(
        new ProviderError(`HTTP Error: 500 - Internal Server Error`)
      )
    })
  })

  describe("without server => should force IO Error", () => {
    test("get IO Error", async () => {
      // given
      const given = "123"

      // when
      const actual = async () => await provider.get(given)

      // then
      await expect(actual).rejects.toThrow(new ProviderError(`IO Error`))
    })
  })
})

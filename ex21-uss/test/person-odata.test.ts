import { ProviderNodeFetchImpl } from "../src/ProviderNodeFetchImpl"

describe("with server", () => {
  let provider: ProviderNodeFetchImpl<any>
  const port = 3001

  beforeEach(async () => {
    const opts = {
      baseUrl: `http://localhost:${port}`,
    }
    provider = new ProviderNodeFetchImpl(opts)
  })

  test.skip("calcUrl", () => {
    // given
    const given = "123"

    // when
    const actual = provider.calcUrl(given)

    // then
    expect(actual).toBe(`http://localhost:${port}/People/123`)
  })
})

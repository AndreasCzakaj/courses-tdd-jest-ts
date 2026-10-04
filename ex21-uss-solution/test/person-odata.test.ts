import { PersonOdataProviderNodeFetchImpl } from "../src/PersonOdataProviderNodeFetchImpl"

describe("with server", () => {
  let provider: PersonOdataProviderNodeFetchImpl
  const port = 3001

  beforeEach(async () => {
    const opts = {
      baseUrl: `http://localhost:${port}`,
    }
    provider = new PersonOdataProviderNodeFetchImpl(opts)
  })

  test("calcUrl", async () => {
    // given
    const given = "123"

    // when
    const actual = provider.calcUrl(given)

    // then
    expect(actual).toBe(`http://localhost:${port}/People/123`)
  })
})

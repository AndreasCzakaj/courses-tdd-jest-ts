import { ProviderNodeFetchImpl } from "../src/ProviderNodeFetchImpl"
import { PersonOdata } from "../src/user-self-service"

describe("ProviderNodeFetchImpl", () => {
  let provider: ProviderNodeFetchImpl<PersonOdata>
  const port = 3001

  beforeEach(() => {
    provider = new ProviderNodeFetchImpl<PersonOdata>({
      baseUrl: `http://localhost:${port}/People`,
    })
  })

  test("calcUrl", () => {
    // given
    const given = "123"

    // when
    const actual = provider.calcUrl(given)

    // then
    expect(actual).toBe(`http://localhost:${port}/People/123`)
  })
})

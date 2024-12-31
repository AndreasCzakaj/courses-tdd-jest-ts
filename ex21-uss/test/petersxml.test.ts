describe("petersxml.test", () => {
  let service

  beforeEach(() => {
    service = () => null
  })

  test("init", () => {
    // given

    // when
    const actual = service()

    // then
    expect(actual).toEqual({
      userGroups: ["customerA", "providersB"],
    })
  })
})

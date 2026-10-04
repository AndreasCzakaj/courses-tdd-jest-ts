describe("main.test", () => {
  it("app should print a uuid", async () => {
    // given
    const log = vi.spyOn(console, "log").mockImplementation(() => {})

    // when: the app runs when the module is loaded
    await import("@src/main")

    // then
    expect(log).toHaveBeenCalledOnce()
    expect(log.mock.calls[0][0]).toMatch(/^[a-f0-9]{32}$/)
  })
})

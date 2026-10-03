import { people } from "@src/objects"

describe("objects.test", () => {
  test("init", () => {
    expect(people).toBeArrayOfSize(1000)
  })

  it.todo("should verify that person at index 23 has firstName 'Kim'")

  it.todo(
    "should verify that person at index 23 contains fields (keys) 'id' and 'ipAddress'"
  )

  it.todo(
    "should verify that person at index 23 contains values '55.247.214.105' and 'Rawcliffe'"
  )

  it.todo(
    "should verify that person at index 23 equals the expected person, in one go"
  )

  it.todo("should verify that person at index 23 matches partially")

  it.todo("should verify that an action throws an Error with message 'oops'")
})

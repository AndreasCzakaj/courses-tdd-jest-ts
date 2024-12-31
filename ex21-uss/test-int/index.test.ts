import { server, config, mongodb } from "../src/index"
import fetch from "node-fetch"

describe("index", () => {
  test("index / OK", async () => {
    const url = `http://localhost:${config.port}/`
    const resp = await fetch(url)
    expect(resp.status).toBe(200)
    expect(await resp.json()).toMatchObject({
      name: "BA demo app",
    })
  })

  afterAll(() => {
    server?.close()
    mongodb.stop()
  })
})

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

  test("/uss/session", async () => {
    const resp = await fetch(`http://localhost:${config.port}/uss/session`, {
      method: "POST",
    })
    expect(resp.status).toBe(400)
  })

  test("/uss/signUp", async () => {
    const resp = await fetch(`http://localhost:${config.port}/uss/signUp`, {
      method: "POST",
    })
    expect(resp.status).toBe(400)
  })

  // Calls the real OData service on the internet => only on demand:
  //   LIVE=1 npm run inttest
  test.skipIf(!process.env.LIVE)(
    "/uss/signUp should fetch the person from the real OData service",
    async () => {
      const resp = await fetch(`http://localhost:${config.port}/uss/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "russellwhyte",
          password: "otherpasswd",
        }),
      })
      expect(resp.status).toBe(201)
      expect(await resp.json()).toMatchObject({
        username: "russellwhyte",
        firstName: "Russell",
        lastName: "Whyte",
      })
    }
  )

  afterAll(() => {
    server?.close()
    mongodb.stop()
  })
})

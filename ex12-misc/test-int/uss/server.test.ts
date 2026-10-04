import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"
import { Account } from "@src/uss/account"
import { RunningServer, runServer } from "@src/uss/server"
import {
  createNotVerifiedAccount,
  createValidCredentials,
  createValidCredentialsNotVerifiedAccount,
  createValidCredentialsUnknownUser,
  createVerifiedAccount,
  VALID_BUT_WRONG_PASSWORD,
} from "@test/uss/test-utils"

// the very first start downloads the MongoDB binary
const MONGO_START_TIMEOUT_MS = 120_000

// All parts together: HTTP => Express => controller => service => MongoDB.
// The details of each scenario are covered by the (much faster) unit tests.
describe("server.test", () => {
  let mongodb: MongoMemoryServer
  let server: RunningServer

  beforeAll(async () => {
    vi.spyOn(console, "log").mockImplementation(() => {})

    mongodb = await MongoMemoryServer.create()
    const mongoUri = mongodb.getUri("uss")
    await saveAccounts(mongoUri, [
      createVerifiedAccount(),
      createNotVerifiedAccount(),
    ])

    server = await runServer({ port: 0, mongoUri })
  }, MONGO_START_TIMEOUT_MS)

  afterAll(async () => {
    await server?.close()
    await mongodb?.stop()
  })

  test.each`
    body                                                                   | expected | reason
    ${{}}                                                                  | ${400}   | ${"credentials have invalid syntax"}
    ${createValidCredentialsUnknownUser()}                                 | ${401}   | ${"no such username"}
    ${{ ...createValidCredentials(), password: VALID_BUT_WRONG_PASSWORD }} | ${401}   | ${"wrong password"}
    ${createValidCredentialsNotVerifiedAccount()}                          | ${400}   | ${"account not verified"}
  `("POST /uss/login => $expected: $reason", async ({ body, expected }) => {
    const resp = await postLogin(JSON.stringify(body))

    expect(resp.status).toBe(expected)
    expect(await resp.json()).toEqual({ error: expect.any(String) })
  })

  test("POST /uss/login => 400: no body at all", async () => {
    const resp = await postLogin(undefined)

    expect(resp.status).toBe(400)
  })

  test("POST /uss/login => 200 + session", async () => {
    const account = createVerifiedAccount()

    const resp = await postLogin(JSON.stringify(createValidCredentials()))

    expect(resp.status).toBe(200)
    expect(await resp.json()).toEqual({
      accountId: account.id,
      username: account.username,
      email: account.email,
    })
  })

  function postLogin(body: string | undefined): Promise<Response> {
    return fetch(`http://localhost:${server.port}/uss/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })
  }
})

async function saveAccounts(
  mongoUri: string,
  accounts: Account[],
): Promise<void> {
  const client = new MongoClient(mongoUri)
  await client.db().collection<Account>("accounts").insertMany(accounts)
  await client.close()
}

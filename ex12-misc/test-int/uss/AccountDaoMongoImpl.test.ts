import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"
import { Account } from "@src/uss/account"
import { DaoError } from "@src/uss/AccountDao"
import { AccountDaoMongoImpl } from "@src/uss/AccountDaoMongoImpl"
import { createVerifiedAccount } from "@test/uss/test-utils"

// the very first start downloads the MongoDB binary
const MONGO_START_TIMEOUT_MS = 120_000

describe("AccountDaoMongoImpl.test", () => {
  let mongodb: MongoMemoryServer
  let mongoUri: string
  let client: MongoClient
  let dao: AccountDaoMongoImpl

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create()
    mongoUri = mongodb.getUri("uss")
  }, MONGO_START_TIMEOUT_MS)

  afterAll(async () => {
    await mongodb.stop()
  })

  afterEach(async () => {
    await client.close()
  })

  describe("OK", () => {
    beforeEach(() => {
      client = new MongoClient(mongoUri)
      dao = new AccountDaoMongoImpl(client)
    })

    test("should find an account by its username", async () => {
      // given
      const account = createVerifiedAccount()
      await client
        .db()
        .collection<Account>("accounts")
        .insertOne({ ...account })

      // when
      const actual = await dao.findByUsername(account.username)

      // then: the account as it was saved, w/out Mongo's internal ID
      expect(actual).toEqual(account)
    })

    test("should return undefined for an unknown username", async () => {
      expect(await dao.findByUsername("idonotexist")).toBeUndefined()
    })
  })

  describe("Errors because of missing server", () => {
    beforeEach(async () => {
      // stopping the db to force an error
      await mongodb.stop()
      client = new MongoClient(mongoUri, {
        serverSelectionTimeoutMS: 500,
        connectTimeoutMS: 500,
        socketTimeoutMS: 500,
      })
      dao = new AccountDaoMongoImpl(client)
    })

    test("findByUsername should throw a DaoError", async () => {
      await expect(() =>
        dao.findByUsername("alice_verified"),
      ).rejects.toThrowWithMessage(DaoError, "Mongo Error")
    })
  })
})

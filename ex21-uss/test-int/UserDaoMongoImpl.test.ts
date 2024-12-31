import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"
import { User } from "../src/user-self-service"
import { UserDaoMongoImpl } from "../src/DaoMongoImpl"
import { DaoError } from "../src/Dao"

describe("UserDaoMongoImpl.test", () => {
  let mongodb
  let uri
  let client
  let dao

  describe("OK", () => {
    beforeAll(async () => {
      mongodb = await MongoMemoryServer.create()
      uri = mongodb.getUri()
    })

    afterAll(async () => {
      await mongodb.stop()
    })

    beforeEach(() => {
      client = new MongoClient(uri)
      dao = new UserDaoMongoImpl(client)
    })

    afterEach(async () => {
      await client.close()
    })

    test("cycle OK", async () => {
      // given
      const username = "testuser"
      const user2Add: User = {
        username,
      }

      expect(await dao.get(username)).toBe(undefined)

      const userAfterSave = await dao.save(username, user2Add)
      expect(userAfterSave.username).toEqual(username)

      const user = await dao.get(username)
      expect(user).not.toBe(undefined)
      expect(user).not.toBe(null)
      expect(user.username).toEqual(user2Add.username)
    })
  })

  describe("Errors because of missing  server", () => {
    beforeAll(async () => {
      mongodb = await MongoMemoryServer.create()
      uri = mongodb.getUri()
    })

    afterAll(async () => {})

    beforeEach(async () => {
      // stopping the db to force an error
      await mongodb.stop()
      client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 500,
        connectTimeoutMS: 500,
        socketTimeoutMS: 500,
      })
      dao = new UserDaoMongoImpl(client)
    })

    afterEach(async () => {
      await client.close()
    })

    test("get error", async () => {
      // given
      const username = "testuser"
      await expect(() => dao.get(username)).rejects.toThrowWithMessage(
        DaoError,
        "Mongo Error"
      )
    })
    test("save error", async () => {
      // given
      const username = "testuser"
      const user2Add: User = {
        username,
      }

      await expect(() =>
        dao.save(username, user2Add)
      ).rejects.toThrowWithMessage(DaoError, "Mongo Error")
    })
  })
})

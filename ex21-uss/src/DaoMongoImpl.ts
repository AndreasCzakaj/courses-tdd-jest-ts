import { MongoClient } from "mongodb"
import { DaoError, Dao } from "./Dao"
import { User } from "./user-self-service"
import { Identifier } from "../../ex02-matchers/node_modules/@babel/types/lib/index-legacy.d"

export class DaoMongoImpl<T> implements Dao<T> {
  constructor(
    mongoClient: MongoClient,
    private identifierQueryProvider: (
      identifier: string
    ) => Record<string, string>
  ) {
    const database = mongoClient.db()
    this.collection = database.collection("users")
  }

  private collection

  async get(identifier: string): Promise<T | null> {
    const query = this.identifierQueryProvider(identifier)

    try {
      return await this.collection.findOne(query)
    } catch (e) {
      //console.warn("get: Mongo Error", e)
      throw new DaoError("Mongo Error", e)
    }
  }

  async save(identifier: string, object: T) {
    try {
      const out = await this.collection.insertOne(object)
      return { ...object, insertedId: out.insertedId }
    } catch (e) {
      //console.warn("get: Mongo Error", e)
      throw new DaoError("Mongo Error", e)
    }
  }
}

export class UserDaoMongoImpl extends DaoMongoImpl<User> {
  constructor(mongoClient: MongoClient) {
    super(mongoClient, (identifier) => {
      return {
        username: identifier,
      }
    })
  }
}

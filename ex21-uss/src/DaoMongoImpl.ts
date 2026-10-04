import {
  Collection,
  Document,
  Filter,
  MongoClient,
  OptionalUnlessRequiredId,
} from "mongodb"
import { DaoError, Dao } from "./Dao"
import { User } from "./user-self-service"

export class DaoMongoImpl<T extends Document> implements Dao<T> {
  private readonly collection: Collection<T>

  constructor(
    mongoClient: MongoClient,
    private readonly identifierQueryProvider: (identifier: string) => Filter<T>,
    collectionName: string
  ) {
    const database = mongoClient.db()
    this.collection = database.collection<T>(collectionName)
  }

  async get(identifier: string): Promise<T | null> {
    const query = this.identifierQueryProvider(identifier)

    try {
      return (await this.collection.findOne(query)) as T | null
    } catch (e) {
      //console.warn("get: Mongo Error", e)
      throw new DaoError("Mongo Error", e)
    }
  }

  async save(_identifier: string, object: T): Promise<T> {
    try {
      const out = await this.collection.insertOne(
        object as OptionalUnlessRequiredId<T>
      )
      return { ...object, insertedId: out.insertedId }
    } catch (e) {
      //console.warn("get: Mongo Error", e)
      throw new DaoError("Mongo Error", e)
    }
  }
}

// a specific implementation of the generic one
export class UserDaoMongoImpl extends DaoMongoImpl<User> {
  constructor(mongoClient: MongoClient) {
    super(mongoClient, (identifier) => ({ username: identifier }), "users")
  }
}

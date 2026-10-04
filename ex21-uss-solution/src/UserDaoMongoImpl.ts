import { Collection, MongoClient, ObjectId } from "mongodb"
import { DaoError, UserDao } from "./UserDao"
import { User } from "./user-self-service"

export class UserDaoMongoImpl implements UserDao {
  private readonly collection: Collection<User>

  constructor(mongoClient: MongoClient, collName = "users") {
    const database = mongoClient.db()
    this.collection = database.collection<User>(collName)
  }

  async get(identifier: string): Promise<User | undefined> {
    const query = {
      username: identifier,
    }

    try {
      const out = await this.collection.findOne(query)
      return out === null ? undefined : out
    } catch (e) {
      //console.warn("get: Mongo Error", e)
      throw new DaoError("Mongo Error", e)
    }
  }

  async save(_identifier: string, user: User): Promise<User> {
    try {
      const out = await this.collection.insertOne(user)
      const saved: User & { insertedId: ObjectId } = {
        ...user,
        insertedId: out.insertedId,
      }
      return saved
    } catch (e) {
      //console.warn("get: Mongo Error", e)
      throw new DaoError("Mongo Error", e)
    }
  }
}

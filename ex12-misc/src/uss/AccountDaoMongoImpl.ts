import { Collection, MongoClient } from "mongodb"
import { Account } from "./account"
import { AccountDao, DaoError } from "./AccountDao"

export class AccountDaoMongoImpl implements AccountDao {
  private readonly collection: Collection<Account>

  constructor(mongoClient: MongoClient, collName = "accounts") {
    this.collection = mongoClient.db().collection<Account>(collName)
  }

  async findByUsername(username: string): Promise<Account | undefined> {
    try {
      const account = await this.collection.findOne(
        { username },
        // w/out Mongo's internal ID
        { projection: { _id: 0 } },
      )
      return account ?? undefined
    } catch (e) {
      throw new DaoError("Mongo Error", e)
    }
  }
}

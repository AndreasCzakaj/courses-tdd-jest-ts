// Starts the user self service for local use: `npm run uss`
// The database is a MongoDB in memory, filled with the accounts below.
import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"
import { randomUUID } from "node:crypto"
import { Account, AccountStatus } from "./account"
import { hashPassword } from "./password"
import { runServer } from "./server"

const accounts: {
  username: string
  password: string
  status: AccountStatus
}[] = [
  {
    username: "alice_verified",
    password: "Correct-Horse_42",
    status: "verified",
  },
  { username: "bob_not_verified", password: "Battery.Staple+7", status: "new" },
]

const mongodb = await MongoMemoryServer.create()
const mongoUri = mongodb.getUri("uss")

const client = new MongoClient(mongoUri)
await client
  .db()
  .collection<Account>("accounts")
  .insertMany(
    accounts.map(({ username, password, status }) => ({
      id: randomUUID(),
      username,
      passwordHash: hashPassword(password),
      email: `${username}@example.com`,
      tcAccepted: new Date(),
      status,
    })),
  )
await client.close()

console.log("MongoDB in memory:", mongoUri)
console.table(accounts)

await runServer({ port: process.env.PORT || 3000, mongoUri })

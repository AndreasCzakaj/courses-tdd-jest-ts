// Starts the user self service for local use: `npm run uss`
// The database is a MongoDB in memory, filled with the accounts below.
import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"
import { randomBytes, randomUUID, scryptSync } from "node:crypto"

const accounts = [
  { username: "alice_verified", password: "Correct-Horse_42", status: "verified" },
  { username: "bob_not_verified", password: "Battery.Staple+7", status: "new" },
]

const mongodb = await MongoMemoryServer.create()
const mongoUri = mongodb.getUri("uss")

const client = new MongoClient(mongoUri)
await client
  .db()
  .collection("accounts")
  .insertMany(
    accounts.map(({ username, password, status }) => ({
      id: randomUUID(),
      username,
      passwordHash: hash(password),
      email: `${username}@example.com`,
      tcAccepted: new Date(),
      status,
    }))
  )
await client.close()

console.log("MongoDB in memory:", mongoUri)
console.table(accounts)

process.env.MONGO_URI = mongoUri
await import("./server")

// format: "<salt>:<hash>", both hex encoded
function hash(password: string): string {
  const salt = randomBytes(16).toString("hex")
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`
}

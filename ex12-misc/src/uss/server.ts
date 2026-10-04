import { Server } from "node:http"
import { AddressInfo } from "node:net"
import express from "express"
import { MongoClient } from "mongodb"
import { AccountDaoMongoImpl } from "./AccountDaoMongoImpl"
import { LoginController } from "./LoginController"
import { UserSelfService } from "./user-self-service"

// Integration code only: wires the parts, defines the routes, starts the server.
// No logic here => nothing to unit test, the integration test covers it.

export type ServerConfig = {
  // 0: any free port
  port: number | string
  mongoUri: string
}

export type RunningServer = {
  port: number
  close(): Promise<void>
}

export async function runServer(config: ServerConfig): Promise<RunningServer> {
  const mongoClient = new MongoClient(config.mongoUri)
  const accountDao = new AccountDaoMongoImpl(mongoClient)
  const service = new UserSelfService(accountDao)
  const loginController = new LoginController(service)

  const app = express()
  app.use(express.json())

  app.post("/uss/login", (req, resp) => loginController.action(req, resp))

  const server = await listen(app, config.port)
  const { port } = server.address() as AddressInfo
  console.log(`Server is running on port ${port}`)

  return {
    port,
    close: async () => {
      server.close()
      await mongoClient.close()
    },
  }
}

function listen(app: express.Express, port: number | string): Promise<Server> {
  return new Promise((resolve) => {
    const server = app.listen(port, () => resolve(server))
  })
}

import { Server } from "node:http"
import express from "express"
import cors from "cors"

export type ServerConfig = {
  port: number | string
  // ToDo: add the controllers
}

export async function runServer(config: ServerConfig): Promise<Server> {
  console.log("init server...", config)

  // define routes
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get("/", (_req, resp) => {
    resp.status(200).send({
      name: "BA demo app",
      endpoints: [{ login: "/uss/session", signUp: "/uss/signUp" }],
    })
  })

  // ToDo: add the routes POST /uss/session and POST /uss/signUp

  // start
  const server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
  })

  return server
}

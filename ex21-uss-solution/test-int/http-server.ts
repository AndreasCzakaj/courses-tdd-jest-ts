import { Server } from "node:http"
import express from "express"
import cors from "cors"

export async function runServer(port: number): Promise<Server> {
  console.log("runServer...")

  // define routes
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get("/People/404", (_req, resp) => {
    resp.status(404).send()
  })

  app.get("/People/500", (_req, resp) => {
    resp.status(500).send()
  })

  // start
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })

  app.get("/People/123", (_req, resp) => {
    resp.contentType("application/json").send({
      FirstName: "fn",
      LastName: "ln",
    })
  })

  return server
}

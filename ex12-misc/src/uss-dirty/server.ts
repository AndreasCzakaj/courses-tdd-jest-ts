import express from "express"
import { MongoClient } from "mongodb"
import { scryptSync } from "node:crypto"

const app = express()
app.use(express.json())

app.post("/uss/login", async (req, resp) => {
  let c: MongoClient | null = null
  try {
    const d = req.body
    if (d) {
      if (d.username && typeof d.username == "string") {
        if (d.username.length >= 8) {
          if (d.username.length <= 20) {
            if (/^[a-zA-Z0-9\-_]+$/.test(d.username)) {
              if (d.password && typeof d.password == "string") {
                if (d.password.length >= 12 && d.password.length <= 32) {
                  if (/^[a-zA-Z0-9\-_.,+]+$/.test(d.password)) {
                    // check db
                    c = new MongoClient(
                      process.env.MONGO_URI || "mongodb://localhost:27017/uss"
                    )
                    await c.connect()
                    const r = await c
                      .db()
                      .collection("accounts")
                      .findOne({ username: d.username })
                    if (r) {
                      const tmp = r.passwordHash.split(":")
                      const h = scryptSync(d.password, tmp[0], 64).toString("hex")
                      if (h == tmp[1]) {
                        if (r.status == "verified") {
                          resp.status(200).json({
                            accountId: r.id,
                            username: r.username,
                            email: r.email,
                          })
                        } else {
                          resp.status(400).json({ error: "account not verified" })
                        }
                      } else {
                        resp
                          .status(401)
                          .json({ error: "unknown username or wrong password" })
                      }
                    } else {
                      resp
                        .status(401)
                        .json({ error: "unknown username or wrong password" })
                    }
                  } else {
                    resp.status(400).json({ error: "invalid: password" })
                  }
                } else {
                  resp.status(400).json({ error: "invalid: password" })
                }
              } else {
                resp.status(400).json({ error: "invalid: password" })
              }
            } else {
              resp.status(400).json({ error: "invalid: username" })
            }
          } else {
            resp.status(400).json({ error: "invalid: username" })
          }
        } else {
          resp.status(400).json({ error: "invalid: username" })
        }
      } else {
        resp.status(400).json({ error: "invalid: username" })
      }
    } else {
      resp.status(400).json({ error: "invalid: username" })
    }
  } catch (e) {
    console.log(e)
    resp.status(500).json({ error: "try again later" })
  } finally {
    if (c) {
      await c.close()
    }
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server is running on port " + port)
})

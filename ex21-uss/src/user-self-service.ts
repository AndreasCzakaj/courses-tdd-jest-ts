import { pass } from "jest-extended"
import { ValidationError } from "./validation"
import { MongoClient } from "mongodb"
import fetch from "node-fetch"
import { Dao } from "./Dao"

type SignUpData = Pick<User, "username" | "password">

export class UserSelfService {
  constructor(private dao: Dao<User>) {}

  async signUp2(signUpData: SignUpData) {
    signUpData.validate()

    this.dao.get(signUpData.username)
  }

  async signUp(username: string, password: string) {
    if (username?.trim().length > 8) {
      if (username?.trim().length < 12) {
        if (password?.trim().length > 12) {
          if (password?.trim().length < 16) {
            const mongoClient = new MongoClient(
              process.env.MONGO_URI || "not_set"
            )
            try {
              const database = mongoClient.db()
              const collection = database.collection("users")

              try {
                const existingUser = collection.findOne({
                  username,
                })

                if (existingUser === null) {
                  let resp
                  try {
                    const url = `${process.env.ODATA_BASE_URL}/People/${username}`
                    resp = await fetch(url)

                    const status = resp.status
                    const statusText = resp.statusText
                    if (status === 200) {
                      const remoteUserData = await resp.json()

                      collection.insertOne({
                        username,
                        password, // <- ToDo: hash this
                        status: "new",
                        firstName: remoteUserData.FirstName,
                        lastName: remoteUserData.LastName,
                        emails: remoteUserData.Emails,
                      })

                      // email service: send mail to verify mail address, then update the DB

                      return true
                    } else if (status === 404) {
                      console.warn("not found")
                    }
                  } catch (nodeFetchError) {
                    console.error("nodeFetchError", nodeFetchError)
                  }
                } else {
                  console.log("user already exists")
                }
              } catch (sqlError) {}
            } catch (connectionError) {
              console.error(connectionError)
            }
          }
        }
      }
    }

    return false
  }
}

export type Credentials = {
  username: string
  password: string
}

export class UserSelfServiceError extends Error {}

export class UserError extends UserSelfServiceError {}

export class ServerError extends UserSelfServiceError {}

export type User = {
  username: string
  password?: string
  status?: string
  firstName?: string
  lastName?: string
  emails?: string[]
}

export class UserSession {}

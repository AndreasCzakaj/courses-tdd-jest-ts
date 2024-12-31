import { ProviderNodeFetchImpl } from "./ProviderNodeFetchImpl"
import { User, UserSelfService } from "./user-self-service"
import { SignUpController } from "./SignUpController"
import { runServer } from "./index-app"
import { LoginController } from "./LoginController"
import { DaoMongoImpl } from "./DaoMongoImpl"
import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"

// this is an in memory db server. replace with real impl
export const mongodb = await MongoMemoryServer.create()
process.env.MONGO_URI = mongodb.getUri()

export const config = createConfig()
export const server = await runServer(config)

function createConfig() {
  const mongoClient = new MongoClient(process.env.MONGO_URI || "not_set")
  const userDao = new DaoMongoImpl<User>(mongoClient, (identifier) => {
    return {
      username: identifier,
    }
  })
  const personOdataProvider = new ProviderNodeFetchImpl({
    baseUrl:
      "http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People",
  })
  //const uss = new UserSelfService(userDao, personOdataProvider)
  //const signUpController = new SignUpController(uss)
  //const loginController = new LoginController(uss)

  /* const config = {
    port: process.env.PORT || 3000,
    signUpController,
    loginController,
  }

  console.log(config)
  return config */
}

import { PersonOdataProviderNodeFetchImpl } from "./PersonOdataProviderNodeFetchImpl"
import { UserSelfService } from "./user-self-service"
import { SignUpController } from "./SignUpController"
import { runServer, ServerConfig } from "./index-app"
import { LoginController } from "./LoginController"
import { UserDaoMongoImpl } from "./UserDaoMongoImpl"
import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"

export const mongodb = await MongoMemoryServer.create()
const mongoUri = mongodb.getUri()
process.env.MONGO_URI = mongoUri
export const config = createConfig(mongoUri)
export const server = await runServer(config)

function createConfig(mongoUri: string): ServerConfig {
  const mongoClient = new MongoClient(mongoUri)
  const userDao = new UserDaoMongoImpl(mongoClient)
  const personOdataProvider = new PersonOdataProviderNodeFetchImpl({
    baseUrl:
      "https://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))",
  })
  const uss = new UserSelfService(userDao, personOdataProvider)
  const signUpController = new SignUpController(uss)
  const loginController = new LoginController(uss)

  const config: ServerConfig = {
    port: process.env.PORT || 3000,
    signUpController,
    loginController,
  }

  console.log(config)
  return config
}

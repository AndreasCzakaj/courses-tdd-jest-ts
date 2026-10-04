import { runServer, ServerConfig } from "./index-app"
import { MongoMemoryServer } from "mongodb-memory-server"

// this is an in memory db server. replace with real impl
export const mongodb = await MongoMemoryServer.create()
process.env.MONGO_URI = mongodb.getUri()

export const config = createConfig()
export const server = await runServer(config)

function createConfig(): ServerConfig {
  // ToDo: wire the dependencies, the service and the controllers
  //   import { MongoClient } from "mongodb"
  //   import { UserDaoMongoImpl } from "./DaoMongoImpl"
  //   import { ProviderNodeFetchImpl } from "./ProviderNodeFetchImpl"
  //   import { PersonOdata } from "./user-self-service"
  //
  //const mongoClient = new MongoClient(mongodb.getUri())
  //const userDao = new UserDaoMongoImpl(mongoClient)
  //const personOdataProvider = new ProviderNodeFetchImpl<PersonOdata>({
  //  baseUrl:
  //    "https://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People",
  //})
  //const uss = new UserSelfService(userDao, personOdataProvider)
  //const signUpController = new SignUpController(uss)
  //const loginController = new LoginController(uss)

  const config: ServerConfig = {
    port: process.env.PORT || 3000,
    //signUpController,
    //loginController,
  }

  console.log(config)
  return config
}

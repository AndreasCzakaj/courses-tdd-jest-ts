import { LoginController } from "../src/LoginController"
import { UserSelfService } from "../src/user-self-service"
import { createResponseFake } from "./test-utils"

describe("LoginController.test", () => {
  let service: UserSelfService
  let ctrl: LoginController

  beforeEach(() => {
    // ToDo: create the service with working dependencies, see test-utils
    service = new UserSelfService()
    ctrl = new LoginController(service)
  })

  // Tip: `createResponseFake()` records what the controller does with the response

  test.todo("400")

  test.todo("500")

  test.todo("200")
})

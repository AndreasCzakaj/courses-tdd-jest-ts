import { SignUpController } from "../src/SignUpController"
import { UserSelfService } from "../src/user-self-service"
import { createResponseFake } from "./test-utils"

describe("SignUpController.test", () => {
  let service: UserSelfService
  let ctrl: SignUpController

  beforeEach(() => {
    // ToDo: create the service with working dependencies, see test-utils
    service = new UserSelfService()
    ctrl = new SignUpController(service)
  })

  // Tip: `createResponseFake()` records what the controller does with the response

  test.todo("400")

  test.todo("500")

  test.todo("201")
})

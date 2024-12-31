import { LoginController } from "../src/LoginController"

import {
  createResponseFake,
  createUserSelfServiceWithWorkingDeps,
  createValidCredentialsExistingUser,
} from "./test-utils"

describe("LoginController.test", () => {
  let service
  let ctrl

  beforeEach(() => {
    service = createUserSelfServiceWithWorkingDeps()
    ctrl = new LoginController(service)
  })

  test.todo("400")

  test.todo("500")

  test.todo("200")
})

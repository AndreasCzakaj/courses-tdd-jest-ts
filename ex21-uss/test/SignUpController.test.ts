import { SignUpController } from "../src/SignUpController"
import { DaoThrowingImpl } from "../src/Dao"
import { createResponseFake } from "./test-utils"
import { CONTENT_TYPE_JSON } from "../../ex21-uss-solution/src/LoginController"

describe("SignUpController.test", () => {
  let service
  let ctrl

  beforeEach(() => {
    //service = createUserSelfServiceWithWorkingDeps()
    ctrl = new SignUpController(service)
  })

  test.todo("400")

  test.todo("500")

  test.todo("201")
})

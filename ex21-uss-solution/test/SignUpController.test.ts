import { CONTENT_TYPE_JSON } from "../src/controller-utils"
import { SignUpController } from "../src/SignUpController"
import { UserDaoThrowingImpl } from "../src/UserDao"
import { UserSelfService } from "../src/user-self-service"
import {
  createResponseFake,
  createUserSelfServiceWithWorkingDeps,
  createValidCredentialsNewUser,
} from "./test-utils"

describe("SignUpController.test", () => {
  let service: UserSelfService
  let ctrl: SignUpController

  beforeEach(() => {
    service = createUserSelfServiceWithWorkingDeps()
    ctrl = new SignUpController(service)
  })

  test("400", async () => {
    // given
    const req = {}
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toEqual({
      status: 400,
      sent: true,
    })
  })

  test("500", async () => {
    // given
    service.userDao = new UserDaoThrowingImpl()
    const req = {
      body: { ...createValidCredentialsNewUser() },
    }
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toEqual({
      status: 500,
      sent: true,
    })
  })

  test("201", async () => {
    // given
    const req = {
      body: { ...createValidCredentialsNewUser() },
    }
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toMatchObject({
      contentType: CONTENT_TYPE_JSON,
      content: {
        ...createValidCredentialsNewUser(),
        status: "new",
      },
      status: 201,
      sent: true,
    })
  })
})

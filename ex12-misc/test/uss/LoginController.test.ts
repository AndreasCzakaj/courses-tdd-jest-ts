import { AccountDaoThrowingImpl } from "@src/uss/AccountDao"
import { MESSAGE_SERVER_ERROR } from "@src/uss/controller-utils"
import { LoginController } from "@src/uss/LoginController"
import { UserSelfService } from "@src/uss/user-self-service"
import {
  createResponseFake,
  createUserSelfServiceWithWorkingDeps,
  createValidCredentials,
  createValidCredentialsNotVerifiedAccount,
  createValidCredentialsUnknownUser,
  createVerifiedAccount,
  VALID_BUT_WRONG_PASSWORD,
} from "./test-utils"

describe("LoginController.test", () => {
  const MESSAGE_LOGIN_ERROR = "unknown username or wrong password"

  let service: UserSelfService
  let ctrl: LoginController

  beforeEach(() => {
    service = createUserSelfServiceWithWorkingDeps()
    ctrl = new LoginController(service)
  })

  test.each`
    body                                                                   | status | error                     | reason
    ${undefined}                                                           | ${400} | ${"invalid: username"}    | ${"no body"}
    ${{ ...createValidCredentials(), username: "al" }}                     | ${400} | ${"invalid: username"}    | ${"invalid username"}
    ${{ ...createValidCredentials(), password: "pwd" }}                    | ${400} | ${"invalid: password"}    | ${"invalid password"}
    ${createValidCredentialsUnknownUser()}                                 | ${401} | ${MESSAGE_LOGIN_ERROR}    | ${"no such username"}
    ${{ ...createValidCredentials(), password: VALID_BUT_WRONG_PASSWORD }} | ${401} | ${MESSAGE_LOGIN_ERROR}    | ${"wrong password"}
    ${createValidCredentialsNotVerifiedAccount()}                          | ${400} | ${"account not verified"} | ${"account not verified"}
  `("$status: $reason", async ({ body, status, error }) => {
    // given
    const req = { body }
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toEqual({
      status,
      content: { error },
      sent: true,
    })
  })

  test("500: database not available", async () => {
    // given
    service.accountDao = new AccountDaoThrowingImpl()
    const log = vi.spyOn(console, "error").mockImplementation(() => {})
    const req = { body: createValidCredentials() }
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then: the client gets no details, the log does
    expect(resp.collector).toEqual({
      status: 500,
      content: { error: MESSAGE_SERVER_ERROR },
      sent: true,
    })
    expect(log).toHaveBeenCalledOnce()
  })

  test("200: session", async () => {
    // given
    const account = createVerifiedAccount()
    const req = { body: createValidCredentials() }
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toEqual({
      status: 200,
      content: {
        accountId: account.id,
        username: account.username,
        email: account.email,
      },
      sent: true,
    })
  })
})

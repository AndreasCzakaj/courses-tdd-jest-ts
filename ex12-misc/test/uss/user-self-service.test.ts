import { AccountDaoThrowingImpl } from "@src/uss/AccountDao"
import {
  AccountNotVerifiedError,
  AuthenticationError,
  ServerError,
  UserSelfService,
} from "@src/uss/user-self-service"
import { ValidationError } from "@src/uss/validation"
import {
  createUserSelfServiceWithWorkingDeps,
  createValidCredentials,
  createValidCredentialsNotVerifiedAccount,
  createValidCredentialsUnknownUser,
  createVerifiedAccount,
  VALID_BUT_WRONG_PASSWORD,
} from "./test-utils"

describe("user-self-service.test", () => {
  let service: UserSelfService

  beforeEach(() => {
    service = createUserSelfServiceWithWorkingDeps()
  })

  describe("login", () => {
    it("If I pass no credentials there should be a validation error.", async () => {
      // given
      const credentials = undefined

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(new ValidationError("username"))
    })

    it("If I pass syntactically invalid credentials there should be a validation error.", async () => {
      // given
      const credentials = { ...createValidCredentials(), password: "tooshort" }

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(new ValidationError("password"))
    })

    it("If I don't have an account there should be a login error.", async () => {
      // given
      const credentials = createValidCredentialsUnknownUser()

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(new AuthenticationError())
    })

    it("If I don't pass the right password there should be the SAME login error.", async () => {
      // given
      const credentials = {
        ...createValidCredentials(),
        password: VALID_BUT_WRONG_PASSWORD,
      }

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(new AuthenticationError())
    })

    it("If my account is not verified yet there should be an error.", async () => {
      // given
      const credentials = createValidCredentialsNotVerifiedAccount()

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(new AccountNotVerifiedError())
    })

    it("If my account is not verified and the password is wrong there should be the login error.", async () => {
      // given
      const credentials = {
        ...createValidCredentialsNotVerifiedAccount(),
        password: VALID_BUT_WRONG_PASSWORD,
      }

      // when
      const actual = async () => await service.login(credentials)

      // then: the status of an account is none of a stranger's business
      await expect(actual).rejects.toThrow(new AuthenticationError())
    })

    it("If the database does not work then I should get an appropriate error.", async () => {
      // given
      service.accountDao = new AccountDaoThrowingImpl()
      const credentials = createValidCredentials()

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(
        new ServerError("Database not available. Try later."),
      )
    })

    it("If I pass valid credentials of a verified account then I get a session.", async () => {
      // given
      const credentials = createValidCredentials()
      const account = createVerifiedAccount()

      // when
      const actual = await service.login(credentials)

      // then: exactly these fields, e.g. no password hash
      expect(actual).toEqual({
        accountId: account.id,
        username: account.username,
        email: account.email,
      })
    })
  })
})

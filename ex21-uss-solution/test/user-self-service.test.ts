import {
  UserSelfService,
  UserSession,
  validatePassword,
  validateCredentials,
  validateUsername,
  UserError,
  ServerError,
} from "../src/user-self-service"

import { PersonOdataProviderThrowingImpl } from "../src/PersonOdataProvider"
import { UserDaoThrowingImpl } from "../src/UserDao"
import { ValidationError } from "../src/validation"
import {
  createUserSelfServiceWithWorkingDeps,
  createValidCredentialsExistingUser,
  createValidCredentialsNewUser,
  createValidCredentialsNewUserUnknownInRemoteSystem,
  validButWrongPassword,
} from "./test-utils"

describe("user-self-service.test", () => {
  let service: UserSelfService

  beforeEach(() => {
    service = createUserSelfServiceWithWorkingDeps()
  })

  describe("login", () => {
    it("If I pass empty or syntactically invalid credentials there should be a validation error.", async () => {
      // given
      const credentials = undefined

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(
        new ValidationError(["username", "password"])
      )
    })

    it("If I don't have an account yet there should be a login error.", async () => {
      // given
      const credentials = createValidCredentialsNewUser()

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(
        new UserError("Unknown username or wrong password")
      )
    })

    it("If I don't pass the right password then there should be the same login error.", async () => {
      // given
      const credentials = createValidCredentialsExistingUser()
      credentials.password = validButWrongPassword

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(
        new UserError("Unknown username or wrong password")
      )
    })

    it("If the database does not work then I should get an appropriate error.", async () => {
      service.userDao = new UserDaoThrowingImpl()

      // given
      const credentials = createValidCredentialsExistingUser()

      // when
      const actual = async () => await service.login(credentials)

      // then
      await expect(actual).rejects.toThrow(
        new ServerError("Database not available. Try later.")
      )
    })

    it("If I pass valid and existing credentials then I get a UserSession.", async () => {
      // given
      const credentials = createValidCredentialsExistingUser()

      // when
      const actual = await service.login(credentials)

      // then
      expect(actual).toBeInstanceOf(UserSession)
    })
  })

  describe("signUp", () => {
    test("should fail if username already exists", async () => {
      // given
      const signUpData = { ...createValidCredentialsExistingUser() }

      // when
      const actual = async () => await service.signUp(signUpData)

      // then
      await expect(actual).rejects.toThrow(
        new UserError("username already taken")
      )
    })
    test("should fail if user unknown in OData Service", async () => {
      // given
      const signUpData = {
        ...createValidCredentialsNewUserUnknownInRemoteSystem(),
      }

      // when
      const actual = async () => await service.signUp(signUpData)

      // then
      await expect(actual).rejects.toThrow(
        new UserError("user unknown in remote system")
      )
    })

    test("should fail for missing signUp data", async () => {
      // given
      const signUpData = undefined

      // when
      const actual = async () => await service.signUp(signUpData)

      // then
      await expect(actual).rejects.toThrow(
        new ValidationError(["username", "password"])
      )
    })

    it("If the database does not work then I should get an appropriate error.", async () => {
      service.userDao = new UserDaoThrowingImpl()

      // given
      const signUpData = { ...createValidCredentialsNewUser() }

      // when
      const actual = async () => await service.signUp(signUpData)

      // then
      await expect(actual).rejects.toThrow(
        new ServerError("Database not available. Try later.")
      )
    })

    it("If the OData service does not work then I should get an appropriate error.", async () => {
      service.personOdataProvider = new PersonOdataProviderThrowingImpl()

      // given
      const signUpData = { ...createValidCredentialsNewUser() }

      // when
      const actual = async () => await service.signUp(signUpData)

      // then
      await expect(actual).rejects.toThrow(
        new ServerError("Remote Service not available. Try later.")
      )
    })

    test("should pass for valid signUp data", async () => {
      // given
      const signUpData = { ...createValidCredentialsNewUser() }

      // when
      const actual = await service.signUp(signUpData)

      // then
      expect(actual).toMatchObject({
        username: signUpData.username,
        status: "new",
        emails: ["Russell@example.com", "Russell@contoso.com"],
        firstName: "Russell",
        lastName: "Whyte",
      })
    })
  })

  describe("Validation", () => {
    test.each`
      given                  | reason
      ${undefined}           | ${"undefined"}
      ${null}                | ${"null"}
      ${""}                  | ${"empty"}
      ${"   "}               | ${"empty whitespace"}
      ${"1234567"}           | ${"too short"}
      ${"1234567 "}          | ${"too short with padding"}
      ${"12345678901234567"} | ${"too long"}
      ${"123456 89012"}      | ${"invalid char"}
    `("Validate username should fail: $reason", ({ given }) => {
      const actual = () => validateUsername(given)
      expect(actual).toThrow(new ValidationError(["username"]))
    })

    test.each`
      given                                                            | reason
      ${"12345678"}                                                    | ${"min size"}
      ${"1234567890123456"}                                            | ${"max size"}
      ${"abcd5678"}                                                    | ${"all allowed chars"}
      ${createValidCredentialsNewUser().username}                      | ${"createValidCredentialsNewUser"}
      ${createValidCredentialsExistingUser().username}                 | ${"createValidCredentialsExistingUser"}
      ${createValidCredentialsNewUserUnknownInRemoteSystem().username} | ${"createValidCredentialsNewUserUnknownInRemoteSystem"}
    `("Validate username should pass: $reason", ({ given }) => {
      const actual = () => validateUsername(given)
      expect(actual).not.toThrow(new ValidationError(["username"]))
    })

    test.each`
      given              | reason
      ${undefined}       | ${"undefined"}
      ${null}            | ${"null"}
      ${""}              | ${"empty"}
      ${"   "}           | ${"empty whitespace"}
      ${"1234567"}       | ${"too short"}
      ${"1234567 "}      | ${"too short with padding"}
      ${"1234567890123"} | ${"too long"}
      ${"123456 89012"}  | ${"invalid char"}
    `("Validate password should fail: $reason", ({ given }) => {
      const actual = () => validatePassword(given)
      expect(actual).toThrow(new ValidationError(["password"]))
    })

    test.each`
      given                                                            | reason
      ${"12345678"}                                                    | ${"min size"}
      ${"123456789012"}                                                | ${"max size"}
      ${"a-._A6789012"}                                                | ${"all allowed chars"}
      ${createValidCredentialsNewUser().password}                      | ${"createValidCredentialsNewUser"}
      ${createValidCredentialsExistingUser().password}                 | ${"createValidCredentialsNewUser"}
      ${createValidCredentialsNewUserUnknownInRemoteSystem().password} | ${"createValidCredentialsNewUserUnknownInRemoteSystem"}
      ${validButWrongPassword}                                         | ${"validButWrongPassword"}
    `("Validate password should pass: $reason", ({ given }) => {
      const actual = () => validatePassword(given)
      expect(actual).not.toThrow(new ValidationError(["password"]))
    })

    test.each`
      given        | reason
      ${undefined} | ${"undefined"}
      ${null}      | ${"null"}
    `("Validate credentials should fail: $reason", ({ given }) => {
      const actual = () => validateCredentials(given)
      expect(actual).toThrow(new ValidationError(["username", "password"]))
    })

    test.each`
      given                                                   | reason
      ${createValidCredentialsNewUser()}                      | ${"createValidCredentialsNewUser"}
      ${createValidCredentialsExistingUser()}                 | ${"createValidCredentialsExistingUser"}
      ${createValidCredentialsNewUserUnknownInRemoteSystem()} | ${"createValidCredentialsNewUserUnknownInRemoteSystem"}
    `("Validate credentials should pass: $reason", ({ given }) => {
      const actual = () => validateCredentials(given)
      expect(actual).not.toThrow(new ValidationError(["username", "password"]))
    })
  })
})

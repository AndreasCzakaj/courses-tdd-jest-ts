describe("user-self-service.test", () => {
  let service

  beforeEach(() => {})

  test("init", () => {
    expect(service).not.toBe(undefined)
  })

  describe("Validation: pure function tests to validate atomic inputs", () => {
    test.todo("Validate username should fail: $reason")

    test.todo("Validate username should pass: $reason")

    test.todo("Validate password should fail: $reason")

    test.todo("Validate credentials should fail: $reason")

    test.todo("Validate credentials should pass: $reason")
  })

  describe("As a User, I want to login using my username and password, thus getting a UserSession object", () => {
    test.todo(
      "If I pass empty or syntactically invalid credentials there should be a validation error."
    )

    test.todo("If I don't have an account yet there should be a user error.")

    test.todo(
      "If I don't pass the right password then there should be the same user error."
    )

    test.todo(
      "If I pass valid and existing credentials then I get an instance of UserSession."
    )

    test.todo("If the database does not work then I should get a server error.")

    test.todo(
      "If the database does not work then I should get a server error - variant using mocks"
    )
  })

  describe("As an interested who already has their data in 'the remote OData Service' , I want to sign up to the app providing a username and password for later authentication. Also, the username will be used to fetch my additional data from the remote service.", () => {
    test.todo(
      "If I pass empty or syntactically invalid sign up data there should be a validation error."
    )

    test.todo("If the database does not work then I should get a server error.")

    test.todo(
      "If I pass a username that already exist in the app's DB there should be a User Error."
    )

    test.todo(
      "If I pass a username that does not exist in the app's DB but whose data does not exist in the remote OData Service there should be a User Error."
    )

    test.todo(
      "If the OData service does not work then I should get a server error."
    )

    it.todo(
      "should pass for valid signUp data, yielding a User object containing the username and credentials I passed, as well: status: 'new', 'emails' array from remote service, 'firstName' from remote service, 'lastName' from remote service"
    )
  })
})

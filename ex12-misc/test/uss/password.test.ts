import { hashPassword, verifyPassword } from "@src/uss/password"
import { VALID_BUT_WRONG_PASSWORD, VALID_PASSWORD } from "./test-utils"

describe("password.test", () => {
  const SALT = "00112233445566778899aabbccddeeff"

  describe("hashPassword", () => {
    test("should return salt and hash, hex encoded", () => {
      expect(hashPassword(VALID_PASSWORD)).toMatch(
        /^[a-f0-9]{32}:[a-f0-9]{128}$/,
      )
    })

    test("should not contain the password", () => {
      expect(hashPassword(VALID_PASSWORD)).not.toContain(VALID_PASSWORD)
    })

    test("should be reproducible for the same salt", () => {
      expect(hashPassword(VALID_PASSWORD, SALT)).toEqual(
        hashPassword(VALID_PASSWORD, SALT),
      )
    })

    test("should use a new salt each time: same password, different hashes", () => {
      expect(hashPassword(VALID_PASSWORD)).not.toEqual(
        hashPassword(VALID_PASSWORD),
      )
    })
  })

  describe("verifyPassword", () => {
    const passwordHash = hashPassword(VALID_PASSWORD, SALT)

    test("should accept the right password", () => {
      expect(verifyPassword(VALID_PASSWORD, passwordHash)).toBeTrue()
    })

    test.each`
      password                    | given                        | reason
      ${VALID_BUT_WRONG_PASSWORD} | ${passwordHash}              | ${"wrong password"}
      ${""}                       | ${passwordHash}              | ${"empty password"}
      ${VALID_PASSWORD}           | ${SALT}                      | ${"stored value w/out hash"}
      ${VALID_PASSWORD}           | ${""}                        | ${"stored value empty"}
      ${VALID_PASSWORD}           | ${passwordHash.slice(0, -1)} | ${"stored hash truncated"}
    `("should reject: $reason", ({ password, given }) => {
      expect(verifyPassword(password, given)).toBeFalse()
    })
  })
})

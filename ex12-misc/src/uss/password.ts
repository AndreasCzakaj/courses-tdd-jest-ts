import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

const SALT_BYTES = 16
const HASH_BYTES = 64
const SEPARATOR = ":"

/** @returns "<salt>:<hash>", both hex encoded */
export function hashPassword(password: string, salt = createSalt()): string {
  return salt + SEPARATOR + calcHash(password, salt)
}

export function verifyPassword(
  password: string,
  passwordHash: string,
): boolean {
  const [salt, expected = ""] = passwordHash.split(SEPARATOR)
  const actual = calcHash(password, salt)
  return (
    actual.length === expected.length &&
    // constant time: the duration must not reveal how many chars match
    timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
  )
}

function createSalt(): string {
  return randomBytes(SALT_BYTES).toString("hex")
}

function calcHash(password: string, salt: string): string {
  return scryptSync(password, salt, HASH_BYTES).toString("hex")
}

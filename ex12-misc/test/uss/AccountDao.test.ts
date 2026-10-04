import {
  AccountDaoDictionaryImpl,
  AccountDaoThrowingImpl,
  DaoError,
} from "@src/uss/AccountDao"
import { createVerifiedAccount } from "./test-utils"

describe("AccountDao.test", () => {
  describe("AccountDaoDictionaryImpl", () => {
    const account = createVerifiedAccount()

    test("should find an account by its username", async () => {
      const dao = new AccountDaoDictionaryImpl([account])
      expect(await dao.findByUsername(account.username)).toEqual(account)
    })

    test("should return undefined for an unknown username", async () => {
      const dao = new AccountDaoDictionaryImpl()
      expect(await dao.findByUsername(account.username)).toBeUndefined()
    })
  })

  describe("AccountDaoThrowingImpl", () => {
    test("findByUsername should throw a DaoError", async () => {
      const dao = new AccountDaoThrowingImpl()
      await expect(() => dao.findByUsername("anyone")).rejects.toThrow(
        new DaoError("findByUsername: oops"),
      )
    })
  })
})

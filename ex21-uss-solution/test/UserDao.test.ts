import { DaoError, UserDaoThrowingImpl } from "../src/UserDao"
import { User } from "../src/user-self-service"

describe("UserDaoThrowingImpl", () => {
  const dao = new UserDaoThrowingImpl()
  const user: User = {
    username: "testuser",
    password: "pa55w0rd",
    status: "new",
    emails: [],
  }

  test("get should throw a DaoError", async () => {
    await expect(() => dao.get(user.username)).rejects.toThrow(
      new DaoError("get: oops")
    )
  })

  test("save should throw a DaoError", async () => {
    await expect(() => dao.save(user.username, user)).rejects.toThrow(
      new DaoError("save: oops")
    )
  })
})

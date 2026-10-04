export type AccountStatus = "new" | "verified"

export type Account = {
  id: string
  username: string
  // format: "<salt>:<hash>", see password.ts
  passwordHash: string
  email: string
  tcAccepted: Date
  status: AccountStatus
}

export type Credentials = {
  username: string
  password: string
}

export type UserSession = {
  accountId: string
  username: string
  email: string
}

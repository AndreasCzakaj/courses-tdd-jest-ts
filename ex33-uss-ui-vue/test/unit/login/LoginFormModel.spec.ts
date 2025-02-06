// test/unit/useLoginForm.spec.ts
import { describe, expect, it } from "vitest"
import { createLoginFormModel } from "../../../src/login/LoginModel"
import { nextTick } from "vue"

describe("Login Model", () => {
  it("initially has empty fields, no errors to show and CTA is disabled", () => {
    const {
      username,
      showUsernameError,
      password,
      showPasswordError,
      ctaDisabled,
    } = createLoginFormModel()

    expect(username.value).toBe("")
    expect(showUsernameError.value).toBe(false)
    expect(password.value).toBe("")
    expect(showPasswordError.value).toBe(false)
    expect(ctaDisabled.value).toBe(true)
  })

  it.todo("updates error for username as soon as it changes")

  it.todo("updates error for password as soon as it changes")

  it.todo("disables form CTA if fields are invalid")
  it.todo("enables form CTA if fields are invalid")
})

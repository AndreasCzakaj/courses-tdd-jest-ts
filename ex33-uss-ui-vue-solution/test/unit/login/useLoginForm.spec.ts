// test/unit/useLoginForm.spec.ts
import { describe, it, expect, beforeEach } from "vitest"
import { createLoginFormModel } from "../../../src/login/LoginModel"
import { nextTick } from "vue"

describe("useLoginForm", () => {
  let model

  beforeEach(() => {
    model = createLoginFormModel()
  })

  it("initially has empty fields and no errors", () => {
    const { usernameField, passwordField, ctaDisabled } = model

    expect(usernameField.valueRef.value).toBe("")
    expect(passwordField.valueRef.value).toBe("")
    expect(usernameField.errorRef.value).toBe("")
    expect(passwordField.errorRef.value).toBe("")
    expect(ctaDisabled.value).toBe(true)
  })

  it("validates username as soon as it changes", async () => {
    const { usernameField } = model

    // Initially, no error
    expect(usernameField.errorRef.value).toBe("")

    usernameField.valueRef.value = " "
    await nextTick()
    expect(usernameField.errorRef.value).toBe("Username is required.")

    // Then set username to some valid value
    usernameField.valueRef.value = "JohnDoe"
    await nextTick()

    expect(usernameField.errorRef.value).toBe("")
  })

  it("validates password on blur", async () => {
    const { passwordField } = model

    expect(passwordField.errorRef.value).toBe("")

    passwordField.valueRef.value = " "
    await nextTick()
    expect(passwordField.errorRef.value).toBe("Password is required.")

    passwordField.valueRef.value = "x"
    await nextTick()
    expect(passwordField.errorRef.value).toBe("")
  })

  it("disables form if fields are invalid", async () => {
    const { usernameField, passwordField, ctaDisabled } = model

    // empty fields => invalid
    expect(ctaDisabled.value).toBe(true)

    // fill fields => valid
    usernameField.valueRef.value = "john"
    passwordField.valueRef.value = "123456"
    await nextTick()
    expect(ctaDisabled.value).toBe(false)
  })
})

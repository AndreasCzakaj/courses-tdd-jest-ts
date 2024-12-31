// src/composables/useLoginForm.ts
import { computed } from "vue"
import { FormFieldImpl, type FormField } from "../lib/FormField"

export function createLoginFormModel() {
  const usernameField = new FormFieldImpl({
    label: "Username",
    placeholder: "Enter your username",
    validateImpl: (self: FormField) => {
      if (!self.valueRef.value.trim()) {
        throw new Error("Username is required.")
      }
    },
  })

  const passwordField = new FormFieldImpl({
    label: "Password",
    placeholder: "Enter your password",
    validateImpl: (self: FormField) => {
      if (!self.valueRef.value.trim()) {
        throw new Error("Password is required.")
      }
    },
  })

  const fields = [usernameField, passwordField]

  const validate = () => {
    const out: boolean[] = [usernameField.validate(), usernameField.validate()]
    return out.every((v) => v === true)
  }

  // Check if the form is valid
  const ctaDisabled = computed(() => {
    const tainted: boolean[] = [
      usernameField.tainted.value,
      passwordField.tainted.value,
    ]
    console.log("tainted", tainted)
    return tainted.every((v) => v === false) || !validate()
  })

  // Handle the "Login" submission
  const handleCta = () => {
    if (validate()) {
      console.log(
        "Logging in with",
        usernameField.valueRef.value,
        passwordField.valueRef.value
      )
      // ... your login API call or logic here
    }
  }

  // Return the "view model" — all the refs, computed, and methods
  return {
    fields,
    usernameField,
    passwordField,
    ctaDisabled,
    handleCta,
  }
}

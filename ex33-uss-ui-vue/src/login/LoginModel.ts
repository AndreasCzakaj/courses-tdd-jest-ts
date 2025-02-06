// src/composables/useLoginForm.ts
import { computed, ref, watch } from "vue"

export function createLoginFormModel() {
  const username = ref("")
  const usernameError = ref("initial")
  const showUsernameError = ref(false)
  const usernameLabel = "Username"
  const usernamePlaceholder = ref("Enter your username")

  watch(username, () => {
    touchUsername()
  })

  const validateUsername = () => {
    if (!username.value.trim()) {
      usernameError.value = "Username is required."
      showUsernameError.value = true
      return false
    }
    usernameError.value = ""
    showUsernameError.value = false
    return true
  }

  const touchUsername = () => {
    validateUsername()
  }

  const password = ref("")
  const passwordError = ref("initial")
  const showPasswordError = ref(false)
  const passwordLabel = "Password"
  const passwordPlaceholder = "Enter your password"

  watch(password, () => {
    touchPassword()
  })

  const validatePassword = () => {
    if (!password.value.trim()) {
      passwordError.value = "Password is required."
      showPasswordError.value = true
      return false
    }
    passwordError.value = ""
    showPasswordError.value = false
    return true
  }

  const touchPassword = () => {
    validatePassword()
  }

  const validate = () => {
    const out: boolean[] = [validateUsername(), validatePassword()]
    return out.every((v) => v === true)
  }

  // Check if the form is valid
  const ctaDisabled = computed(() => {
    const ok = [usernameError, passwordError].every((item) => item.value === "")
    return !ok
  })

  // Handle the "Login" submission
  const handleCta = () => {
    if (validate()) {
      console.log("Logging in with", username.value, password.value)
      // ... your login API call or logic here
    }
  }

  return {
    username,
    usernameError,
    showUsernameError,
    usernameLabel,
    usernamePlaceholder,
    touchUsername,

    password,
    passwordError,
    showPasswordError,
    passwordLabel,
    passwordPlaceholder,
    touchPassword,

    ctaDisabled,
    handleCta,
  }
}

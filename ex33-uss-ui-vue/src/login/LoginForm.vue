<!-- src/components/LoginForm.vue -->
<template>
  <form @submit.prevent="handleCta">
    <div>
      <label id="usernameLabel" for="username">{{ usernameLabel }}</label>
      <input
        id="username"
        v-model="username"
        type="text"
        :placeholder="usernamePlaceholder"
        @blur="touchUsername"
      />
      <div id="usernameError" v-if="usernameError" class="error">
        {{ usernameError }}
      </div>
    </div>

    <div>
      <label id="passwordLabel" for="password">{{ passwordLabel }}</label>
      <input
        id="password"
        v-model="password"
        type="password"
        :placeholder="passwordPlaceholder"
        @blur="touchPassword"
      />
      <div id="passwordError" v-if="passwordError" class="error">
        {{ passwordError }}
      </div>
    </div>

    <button :disabled="ctaDisabled" type="submit">
      Login
    </button>
  </form>
</template>

<script lang="ts">

import { computed, defineComponent, ref, watch} from 'vue';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    
    const username = ref("")
    let usernameIsTainted = false
    const usernameError = ref("")
    const usernameLabel = "Username"
    const usernamePlaceholder = ref("Enter your username")

    watch(username, (n: string, o: string) => {
      touchUsername()
    })

    const validateUsername = () => {
      if (usernameIsTainted && !username.value.trim()) {
        usernameError.value = "Username is required."
        return false
      }
      usernameError.value = ""
      return true
    }

    const touchUsername = () => {
      usernameIsTainted = true
      validateUsername()
    }
    
    const password = ref("")
    let passwordIsTainted = false
    const passwordError = ref("")
    const passwordLabel = "Password"
    const passwordPlaceholder = "Enter your password"

    watch(password, (n: string, o: string) => {
      touchPassword()
    })

    const validatePassword = () => {
      if (passwordIsTainted && !password.value.trim()) {
        passwordError.value = "Password is required."
        return false
      }
      passwordError.value = ""
      return true
    }

    const touchPassword = () => {
      passwordIsTainted = true
      validatePassword()
    }


    const validate = () => {
      const out: boolean[] = [validateUsername(), validatePassword()]
      return out.every((v) => v === true)
    }

    // Check if the form is valid
    const ctaDisabled = computed(() => {
      const tainted: boolean[] = [
        usernameIsTainted,
        passwordIsTainted,
      ]
      return tainted.every((v) => v === false) || !validate()
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
      usernameLabel,
      usernamePlaceholder,
      touchUsername,

      password,
      passwordError,
      passwordLabel,
      passwordPlaceholder,
      touchPassword,

      ctaDisabled,
      handleCta,
    }
  },
});
</script>

<style scoped>
/* Basic styling for your login form */
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
}

label {
  margin: 8px 0 4px;
}

input {
  padding: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}

button {
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
}

.error {
  color: red;
  margin-bottom: 12px;
}

.success {
  color: green;
  margin-bottom: 12px;
}

button {
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed; /* or 'default' if you prefer the arrow cursor */
  opacity: 0.6;        /* optional, to visually indicate disabled state */
}
</style>

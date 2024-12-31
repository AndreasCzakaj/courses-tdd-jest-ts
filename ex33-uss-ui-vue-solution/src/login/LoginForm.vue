<!-- src/components/LoginForm.vue -->
<template>
  <form @submit.prevent="handleCta">
    <div>
      <label id="usernameLabel" for="username">{{ usernameField.label }}</label>
      <input
        id="username"
        v-model="usernameValue"
        type="text"
        :placeholder="usernameField.placeholder"
        @blur="usernameField.touch"
      />
      <div id="usernameError" v-if="usernameError" class="error">
        {{ usernameError }}
      </div>
    </div>

    <div>
      <label id="passwordLabel" for="password">{{ passwordField.label }}</label>
      <input
        id="password"
        v-model="passwordValue"
        type="text"
        :placeholder="passwordField.placeholder"
        @blur="passwordField.touch"
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

import { defineComponent, type PropType } from 'vue';
import { createLoginFormModel } from "./LoginModel"

export default defineComponent({
  name: 'LoginForm',
  props: {
    /**
     * This prop should be the result of calling `useLoginForm()`,
     * i.e. an object with username, password, isFormValid, etc.
     */
    loginForm: {
      type: Object as PropType<ReturnType<typeof createLoginFormModel>>,
      required: true,
    },
  },
  setup(props) {
    const out = props.loginForm
    return {
      ...out,
      usernameValue: out.usernameField.valueRef,
      usernameError: out.usernameField.errorRef,
      passwordValue: out.passwordField.valueRef,
      passwordError: out.passwordField.errorRef,
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
  border: 1px solid red;
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

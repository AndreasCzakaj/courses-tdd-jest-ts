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
      <div id="usernameError" v-if="showUsernameError" class="error">
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
      <div id="passwordError" v-if="showPasswordError" class="error">
        {{ passwordError }}
      </div>
    </div>

    <button :disabled="ctaDisabled" type="submit">
      Login
    </button>
  </form>
</template>

<script lang="ts">

import { defineComponent} from 'vue';
import { createLoginFormModel } from './LoginModel';

export default defineComponent({
  name: 'LoginForm',
  /* props: {
    loginForm: {
      type: Object as PropType<ReturnType<typeof createLoginFormModel>>,
      required: true,
    },
  },
  setup(props) {
    return {...props.loginForm}
  }, */
  setup() {
    return {
      ...createLoginFormModel(),
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

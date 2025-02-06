<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>USS Login Form</h1>
    <LoginForm :loginForm="loginFormModel" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from './login/LoginForm.vue';
import { createLoginFormModel } from "./login/LoginModel"

export default defineComponent({
  name: 'App',
  components: {
    LoginForm,
  },
  setup() {
    const loginFormModel = createLoginFormModel();

    return {
      loginFormModel,
    };
  },
});
</script>

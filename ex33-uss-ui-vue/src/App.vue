<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>USS Login Form</h1>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from './login/LoginForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    LoginForm,
  },
});
</script>

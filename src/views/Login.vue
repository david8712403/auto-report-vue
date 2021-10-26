<template>
  <div class="container">
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from "../components/LoginForm.vue";
export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>
<style>
.container {
  margin: 30px auto;
  overflow: auto;
  justify-content: center;
  min-height: 300px;
  padding: 30px;
}
</style>

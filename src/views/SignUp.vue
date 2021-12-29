<template>
  <div class="container">
    <SignUpForm />
  </div>
</template>
<script>
import SignUpForm from "../components/SignUpForm.vue";
export default {
  name: "SignUp",
  components: {
    SignUpForm,
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

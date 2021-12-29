<template>
  <a-spin :spinning="loading">
    <a-card title="Auto Report Login" :bordered="true">
      <div style="margin-bottom: 10px">
        <a-form :model="formState" @submit="onSubmit">
          <a-form-item>
            <a-input v-model:value="data.account" placeholder="Account">
              <template #prefix
                ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-model:value="data.password"
              type="password"
              placeholder="Password"
            >
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
          <div>{{ errorMessage }}</div>
          <a-button
            style="margin-top: 10px"
            type="primary"
            html-type="submit"
            :disabled="data.account === '' || data.password === '' || loading"
          >
            Log in
          </a-button>
        </a-form>
      </div>
      <a href="/#/signup"> Don't have account </a>
    </a-card>
  </a-spin>
</template>

<script>
// import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default {
  name: "LoginForm",
  components: {
    UserOutlined,
    LockOutlined,
  },

  data() {
    return {
      data: {
        account: "",
        password: "",
      },
      loading: false,
      errorMessage: "",
    };
  },

  methods: {
    ...mapActions(["login"]),
    ...mapGetters(["cache"]),
    async onSubmit() {
      this.loading = true;
      this.login(this.data)
        .then(() => this.$router.push("/dashboard"))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style>
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  justify-content: center;
  min-height: 300px;
  padding: 30px;
}
</style>

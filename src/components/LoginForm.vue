<template>
  <a-card title="Auto Report Login" :bordered="true">
    <div>
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
        <br />
        <a-button
          type="primary"
          html-type="submit"
          :disabled="data.account === '' || data.password === '' || loading"
        >
          Log in
        </a-button>
      </a-form>
    </div>
  </a-card>
</template>

<script>
import axios from "axios";
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
    onSubmit() {
      this.loading = true;
      axios
        .post("/auth/login", this.data)
        .then((res) => {
          this.loading = false;
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          if (
            localStorage.getItem("accessToken") &&
            localStorage.getItem("refreshToken")
          ) {
            this.$router.push("/");
          }
        })
        .catch((err) => {
          this.errorMessage = err.response.data.error;
          this.loading = false;
        });
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

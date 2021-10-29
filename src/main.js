import dotenv from "dotenv";
dotenv.config();

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";

import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken } = store.getters.cache;
    console.log(refreshToken);
    console.log(error.response);
    if (error.response.config.url === "/auth/token") {
      alert("已登出，請重新登入");
      await store.dispatch("logout", { token: refreshToken });
      router.push("/login");
    } else if (error.response.status === 403) {
      alert("Token已過期，請重新載入");
      await store.dispatch("updateToken", { token: refreshToken });
    } else {
      alert(error.response.data.error);
    }
    return Promise.reject(error);
  }
);

createApp(App).use(store).use(router).use(Antd).mount("#app");

import dotenv from "dotenv";
dotenv.config();

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";

import axios from "axios";
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(error.response)
    if (error.response.config.url === "/auth/token") {
        alert('已登出，請重新登入');
        router.push("/login");
        localStorage.clear();
    } else if (error.response.status === 403) {
        alert('重新獲取token...請重新載入');
        axios.post('/auth/token', { token: refreshToken }).then((res) => {
            const { accessToken } = res.data
            console.log("get token success");
            localStorage.setItem('accessToken', accessToken);
        })
    }

    return Promise.reject(error);
});

createApp(App).use(store).use(router).use(Antd).mount("#app");

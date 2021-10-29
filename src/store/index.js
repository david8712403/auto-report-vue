import { createStore } from "vuex";
import axios from "axios";

const user = {
  state: {
    cache: {},
  },
  mutations: {
    updateCache(state, cache) {
      const { id, account, accessToken, refreshToken } = cache;
      if (id && account && accessToken && refreshToken) {
        state.cache = cache;
        localStorage.setItem("userCache", JSON.stringify(state.cache));
      } else {
        state.cache = {};
        localStorage.clear();
      }
    },
  },
  getters: {
    cache: (state) => {
      state.cache = JSON.parse(localStorage.getItem("userCache")) ?? {};
      return state.cache;
    },
  },

  actions: {
    async login({ commit }, payload) {
      const res = await axios.post("/auth/login", payload);
      commit("updateCache", res.data);
    },
    async logout({ commit }, payload) {
      await axios.post("/auth/logout", payload);
      commit("updateCache", {});
    },
    async updateToken({ commit, state }, payload) {
      console.log(payload);
      const res = await axios.post("/auth/token", payload);
      commit("updateCache", { ...state.cache, ...res.data });
    },
  },
};

const dailyReport = {
  state: {
    reportList: [],
  },
  mutations: {
    setReportList(state, list) {
      state.reportList = list;
    },
  },
  getters: {
    getReportList: (state) => state.reportList,
  },

  actions: {
    async fetchReportList({ commit }, query) {
      const res = await axios.get("/api/daily_report", {
        headers: {
          Authorization: `Bearer ${user.state.cache.accessToken}`,
        },
        params: query,
      });
      commit("setReportList", res.data.results);
    },
  },
};

export default createStore({
  modules: { user: user, dailyReport: dailyReport },
});
